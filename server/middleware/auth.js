import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_TOKEN;

module.exports = {

  /**
   * Function to check token
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {void}
   */
  checkToken(req, res, next) {
    const token = req.body.token
      || req.query.token
      || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'User not authorized' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Token authentication failed' });
      }
      req.decoded = decoded;
      next();
    });
  }
};
