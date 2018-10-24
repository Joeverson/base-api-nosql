import 'babel-polyfill';
import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import middlewares from './src/middlewares/core';
import routes from './src/routes/core';

/**
 * -------------------------------
 *
 *
 * ENV
 *
 *
 * -------------------------------
 * * */
const nodeEnv = process.env.NODE_ENV;
const file = path.join(__dirname, '/env', `.env.${nodeEnv}`);

// Load env vars
const envConfig = dotenv.parse(fs.readFileSync(file));
const addKey = () => {
  Object.keys(envConfig).forEach((key) => {
    if (key) {
      process.env[key] = envConfig[key];
    }
  });
};
addKey();

/**
 * configuração do dotenv
 */
dotenv.config();

/**
 * -------------------------------
 *
 *
 * DATA BASE CONNECTION
 *
 *
 * -------------------------------
 * * */
const app = express();
const server = http.Server(app);

/**
 * -------------------------------
 *
 *
 * MIDDLEWARE
 *
 *
 * -------------------------------
 * * */

middlewares.config(app);

/**
 * -------------------------------
 *
 *
 * ROUTES
 *
 *
 * -------------------------------
 * * */

routes.config(app);

// Adicionada rota do swagger
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./src/swagger/swagger');

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * -------------------------------
 *
 *
 * ouvindo os serviços
 *
 *
 * -------------------------------
 * */

server.listen(process.env.PORT || 3004, process.env.HOST, () => {
  console.log('Funcionando...');
});
