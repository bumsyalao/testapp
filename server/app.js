import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

const compiler = webpack(config);
const env = process.env.NODE_ENV || 'development';
const route = require('./routes');

require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL);


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (env === 'development') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, '../client')));

route(app);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.set('port', PORT);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
});

export default app;
