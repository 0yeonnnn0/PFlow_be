import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
import authRoutes from "./src/auth/routes/authRoutes.js";
import userRoutes from "./src/users/routes/userRoutes.js";
import serviceRoutes from "./src/services/routes/serviceRoutes.js"; // 서비스 관련 라우트 가져오기
import morgan from "morgan";

const app = express();

// CORS 미들웨어 설정
app.use(cors()); // 모든 도메인에서의 요청 허용

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정
app.use("/api/auth", authRoutes); // 인증 관련 라우트
app.use("/api/users", userRoutes); // 사용자 관련 라우트
app.use("/api/services", serviceRoutes); // 서비스 관련 라우트

// 루트 경로
app.get("/api", (req, res) => {
  res.send("Welcome to PFlow APIs");
});

app.get("/api/ping", (req, res) => {
  res.send("123");
});

// 데이터베이스 연결
connectDB();

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
