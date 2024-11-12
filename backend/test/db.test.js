import { expect } from 'chai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from '../src/config/database.js';
import { Sequelize } from 'sequelize';

//first im specifying the path to the .env file with an absolute path because if i dont it returns undefined for the values. **why?**
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

describe('Database ENV Verification and Connection', () => {
  
  // lets make sure the env variables are loaded and defined before we even try to test!
  describe('Load Environment Variables', () => {
    it('should have all required environment variables loaded and defined', () => {
      const requiredVars = ['NAME', 'USER', 'PASSWORD', 'HOST', 'DIALECT'];
      requiredVars.forEach((varName) => {
        expect(process.env[varName], `${varName} should be defined`).to.not.be.undefined;
        expect(process.env[varName], `${varName} should not be empty`).to.not.be.empty;
      });
    });

    // then, lets log our varibles to the console so we can see them, then verify they are correct.
    it('should log the correct environment variables', () => {
      console.log('Environment Variables:');
      console.log('NAME:', process.env.NAME);
      console.log('USER:', process.env.USER);
      console.log('PASSWORD:', process.env.PASSWORD);
      console.log('HOST:', process.env.HOST);
      console.log('DIALECT:', process.env.DIALECT);

      // Explicitly check each variable against expected values
      expect(process.env.NAME).to.equal('time_tracker');
      expect(process.env.USER).to.equal('root');
      expect(process.env.PASSWORD).to.equal('Psprsx66');
      expect(process.env.HOST).to.equal('localhost');
      expect(process.env.DIALECT).to.equal('mysql');
    });
  });

  //finally lets test this connection with our verified env variables
  describe('Database Connection', () => {
    it('should connect to the database using environment variables', async () => {
      try {
        await sequelize.authenticate();
        expect(true).to.be.true;
      } catch (error) {
        console.error('Database Connection Error:', error);
        expect(false, 'Database connection should succeed').to.be.true;
      }
    });
  });
});
