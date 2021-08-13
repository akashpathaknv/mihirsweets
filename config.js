import dotenv from 'dotenv';

dotenv.config();

export default {
	MONGODB_URL: process.env.MONGODB_URI || 'mongodb://localhost/dryfruit',
	JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
	}