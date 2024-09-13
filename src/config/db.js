// src/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // .env 파일을 읽어 환경 변수 설정

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error("MongoDB URI가 설정되지 않았습니다.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas에 연결되었습니다.");
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);
    process.exit(1);
  }
};

export { connectDB };
