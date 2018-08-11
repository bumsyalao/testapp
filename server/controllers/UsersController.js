import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Users from '../models/Users';
import paginate from '../middleware/paginate';

require('dotenv').config();

const secret = process.env.SECRET_TOKEN;

class User {

	register(req, res) {
		if (
			req.body.email &&
			req.body.password ||
			req.body.admin
		) {
			Users.findOne({ email: req.body.email }).exec((err, existingUser) => {
				if (existingUser) {
					return res.status(409).send({
						success: false,
						error: 'exixting user',
						message: 'A user already exists with that email'
					});
				}
				const newUser = new Users(req.body);
				newUser.save((err) => {
					if (err) {
						return res.status(400).send({
							success: false,
							message: 'There was an error creating user'
						});
					}
					//create token
					const token = jwt.sign(
						{
							email: newUser.email,
							id: newUser._id
						}, secret
					);
					const UserDetails = {
						email: newUser.email,
						id: newUser._id,
						admin: newUser.admin
					};

					//return user and token
					return res.status(201).send({
						success: true,
						message: 'Your account has been created',
						UserDetails,
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
			Users.findOne({ email: req.body.email }).exec()
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
								const UserDetails = {
									email: foundUser.email,
									id: foundUser._id,
									admin: foundUser.admin
								};
								return res.status(200).send({
									success: true,
									message: 'You have logged in succesfully',
									UserDetails,
									token
								});
							}
							return res.status(404).send({
								success: false,
								error: 'Invalid',
								message: 'Incorrect Password'
							});
						});
					}
					else {
						return res.status(400).send({
							success: false,
							error: 'Invalid',
							message: 'Incorrect email or password'
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

	createUser(req, res) {
		Users.findOne({ _id: req.decoded.id }).exec((err, foundUser) => {
			if (foundUser.admin == true) {
				if (req.body.email && validator.isEmail(req.body.email) && req.body.password) {
					Users.findOne({ email: req.body.email }).exec((err, existingUser) => {
						if (existingUser) {
							return res.status(409).send({
								success: false,
								error: 'existing user',
								message: 'A user with the email already exist'
							});
						}
						const newUser = new Users(req.body);
						newUser.save((err) => {
							if (err) {
								return res.status(400).send({
									success: false,
									error: 'Bad request',
									message: 'There was an error creating User'
								});
							}
							//return new user
							return res.status(201).send({
								success: true,
								message: 'User has been created succesfully',
								newUser
							});
						});
					});
				}
				else {
					return res.status(400).send({
						success: false,
						error: 'Bad Request',
						message: 'Please enter a valid email'
					});
				}
			}
			else {
				return res.status(401).send({
					success: false,
					error: 'Unauthorized',
					message: 'You are not authorized to create user'
				});
			}
		});
	}

	retrieveUsers(req, res) {
		const limit = 5;
		const offset = 0;
		const page = req.params.selectPage || 1
		Users.find()
			.skip((limit * page) - limit)
			.limit(limit)
			.exec((err, allUsers) => {
				Users.count().exec((err, count) => {
					if(err){
						return res.status(404).send({ success: false, message: err.message });
					}
					return res.status(200).send({
						success: true,
						message: 'Users found',
						paginate: paginate(count, limit, offset),
						allUsers
					});
				});
			});
	}

	deleteUser(req, res) {
		Users.findOne({ _id: req.decoded.id }).exec((err, logUser) => {
			if (logUser.admin == true) {
				Users.findOne({ _id: req.params.userId })
					.exec()
					.then((foundUser) => {
						Users.findByIdAndRemove({ _id: req.params.userId }, (err) => {
							if (err) {
								return res.status(500).send({
									success: false,
									error: 'delete error',
									message: 'There was an error while deleting user, please try again later'
								});
							}
							return res.status(200).send({
								success: true,
								message: 'User has been deleted succesfully'
							});
						});
					}).catch(error =>
						res.status(400).send({
							success: false,
							error: error.messae,
							message: 'Bad Request'
						}));
			}
			else {
				return res.status(403).send({
					success: false,
					error: 'Forbidden',
					message: 'You are not allowed to delete this user'
				});
			}
		});

	}


}

export default new User();
