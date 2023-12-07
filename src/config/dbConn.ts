import mongoose from 'mongoose';
import 'dotenv/config'
const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default dbConn;