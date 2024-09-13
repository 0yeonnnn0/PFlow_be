// src/users/controllers/userController.js
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// 유저 정보 조회
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// 닉네임 수정
export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "닉네임을 입력해주세요." });
    }
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "닉네임이 수정되었습니다.", username: user.username });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// 비밀번호 수정
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "현재 비밀번호와 새로운 비밀번호를 입력해주세요." });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 현재 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }

    // 새로운 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// 프로필 사진 수정
export const updateProfilePicture = async (req, res) => {
  try {
    const { profilePictureUrl } = req.body;

    if (!profilePictureUrl) {
      return res
        .status(400)
        .json({ message: "프로필 사진 URL을 입력해주세요." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { profilePicture: profilePictureUrl },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "프로필 사진이 수정되었습니다.",
        profilePicture: user.profilePicture,
      });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};
