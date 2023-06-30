import dotenv from 'dotenv';

dotenv.config();

// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = process.env.MONGO_URL || '';


const SERVER_PORT = process.env.PORT ? Number(process.env.PORT): 8000 ;
console.log(SERVER_PORT);

export const config = {
    
    mongo: {
        url: MONGO_URL,
        
        // username: MONGO_USERNAME,
        // password: MONGO_PASSWORD,
       
    },
    server: {
        port: SERVER_PORT
    }
};