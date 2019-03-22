/*
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

Links:
- https://www.npmjs.com/package/dotenv
- https://nodejs.org/docs/latest/api/process.html#process_process_env
- https://12factor.net/config
*/
import dotenv from 'dotenv';
/*
Joi is an Object schema description language and validator for JavaScript objects.

Links:
- https://www.npmjs.com/package/joi
*/
import Joi from 'Joi';

// Configure dotenv
dotenv.config();

// Create a Joi-schema for dotenv
const envVarsSchema = Joi.object({
  NMD_BASELINE: Joi.string().required(),
  NODE_ENV: Joi.string().default('Development'),
  NODE_SERVER_HOSTNAME: Joi.string().default('127.0.0.1'),
  NODE_SERVER_PORT: Joi.number().default(8080),
  MONGODB_CONNECTION: Joi.string().required()
}).unknown().required();

// Validate the dotenv via Joi
const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Create Configuration object
const config = {
  nmdBaseline: envVars.NMD_BASELINE,
  nodeEnv: envVars.NODE_ENV,
  nodeHostname: envVars.NODE_SERVER_HOSTNAME,
  nodePort: envVars.NODE_SERVER_PORT,
  mongoDbConnection: envVars.MONGODB_CONNECTION,
};

// Export it for use in other modules / files
export default config;