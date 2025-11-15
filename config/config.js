// const config = {
// env: process.env.NODE_ENV || 'development',
// port: process.env.PORT || 3000,
// jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
// mongoUri: process.env.MONGODB_URI ||
// "mongodb+srv://adamepaolo:adamepaolo1998@cluster0.xyfnver.mongodb.net/JobTracker?retryWrites=true&w=majority&appName=Cluster0" ||
// process.env.MONGO_HOST ||
// 'mongodb://' + (process.env.IP || 'localhost') + ':' +
// (process.env.MONGO_PORT || '27017') +
// '/mernproject'
// }
// export default config

import dotenv from 'dotenv';
// Load environment variables from .env file immediately
dotenv.config(); 

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",

  // 🔑 Updated to check for your specific .env variable name: MongoDB_URI
  mongoUri: process.env.MongoDB_URI || 
            process.env.MONGODB_URI || // Fallback to a common name
            "mongodb+srv://adamepaolo:adamepaolo1998@cluster0.xyfnver.mongodb.net/JobTracker?retryWrites=true&w=majority&appName=Cluster0"
}
export default config