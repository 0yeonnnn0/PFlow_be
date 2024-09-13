// src/auth/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // 프로필 사진 URL 저장
      default: "",
    },
  },
  { timestamps: true }
);

//mongoose.model()의 첫 번째 인자로는 모델 이름을 넣으면 Mongoose가 자동으로 소문자와 복수형으로 변환합니다.
//User -> users
const User = mongoose.model("User", userSchema);

export default User;
