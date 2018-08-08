import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import adminUser from '../models/adminUsers';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;

class AdminUser {

	register(req, res) {
		if (
			req.body.email &&
			req.body.password
		) {
			adminUser.findOne({ email: req.body.email }).exec((err, existingUser) => {
				if (existingUser) {
					return res.status(409).send({
						success: false,
						error: 'exixting user',
						message: 'A user already exists with that email'
					});
				}
				const newAdminUser = new adminUser(req.body);
				newAdminUser.save((err) => {
					if (err) {
						return res.status(400).send({
							success: false,
							message: 'There was an error creating user'
						});
					}
					//create token
					const token = jwt.sign(
						{
							email: newAdminUser.email,
							id: newAdminUser._id
						}, secret
					);
					const AdminUserDetails = {
						email: newAdminUser.email,
						id: newAdminUser._id
					};

					//return user and token
					return res.status(201).send({
						success: true,
						message: 'Your account has been created',
						AdminUserDetails,
						token
					});
				});
			});
		}
		else {
			return res.status(400).send({
				sucess: false,
				error: 'Invalid credential',
				message: 'Please enter valid email and password'
			});
		}
	}

	login(req, res) {
		if (req.body.email && req.body.password) {
			adminUser.findOne({ email: req.body.email }).exec()
				.then((foundUser) => {
					if (foundUser) {
						foundUser.comparePassword(req.body.password, (err, isMatch) => {
							if (isMatch) {
								const token = jwt.sign(
									{
										email: foundUser.email,
										id: foundUser._id
									}, secret
								);
								const AdminUserDetails = {
									email: foundUser.email,
									id: foundUser._id
								};
								return res.status(200).send({
									success: true,
									message: 'You have logged in succesfully',
									AdminUserDetails,
									token
								});
							}
							return res.status(404).send({
								success: false,
								error: 'Invalid',
								message: 'User does not exist'
							});
						});
					}
					else{
						return res.status(400).send({
							success: false,
							error: 'Invalid',
							message: 'Invalid email or password'
						});
					}
				})
				.catch(err => 
				res.ststus(400).send({
					success: false,
					error: 'Invalid',
					message: err.message
				}));
		}
		else {
			return res.status(400).send({
				success: false,
				message: 'Incomplete login details'
			});
		}
	}

	
}

export default new AdminUser();