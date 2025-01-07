import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), 'config.env') })

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default ConnectToDB;