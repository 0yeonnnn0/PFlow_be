// src/services/controllers/serviceController.js
import Service from "../models/serviceModel.js";
import { v4 as uuidv4 } from "uuid"; // uuid 모듈 임포트

// 모든 서비스 조회
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "서비스 조회 중 오류가 발생했습니다." });
  }
};

// 완료된 서비스만 조회 (currentStep: 7)
export const getCompletedServices = async (req, res) => {
  try {
    // currentStep이 7인 서비스만 필터링
    const services = await Service.find({ currentStep: 7 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "서비스 조회 중 오류가 발생했습니다." });
  }
};

// 새로운 서비스 생성

export const createService = async (req, res) => {
  try {
    // uuid로 고유한 _id 생성
    const id = uuidv4();

    // 새로운 서비스 객체 생성 (_id를 uuid로 설정)
    const newService = new Service({
      _id: id, // _id를 uuid로 설정
    });

    // 데이터베이스에 저장
    await newService.save();

    // 저장된 서비스 정보 응답
    res.status(201).json(newService);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "서비스 생성 중 오류가 발생했습니다." });
  }
};

// export const createService = async (req, res) => {
//   try {
//     const newService = new Service(req.body);
//     await newService.save();
//     res.status(201).json(newService);
//   } catch (error) {
//     res.status(400).json({ error: "서비스 생성 중 오류가 발생했습니다." });
//   }
// };

// 특정 서비스 조회
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "서비스를 찾을 수 없습니다." });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: "서비스 조회 중 오류가 발생했습니다." });
  }
};

// 특정 서비스 업데이트
// export const updateService = async (req, res) => {
//   try {
//     console.log(req.body);
//     const updatedService = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { step1: req.body.step1 },
//       { new: true }
//     );
//     if (!updatedService) {
//       return res.status(404).json({ error: "서비스를 찾을 수 없습니다." });
//     }
//     res.status(200).json(updatedService);
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ error: "서비스 업데이트 중 오류가 발생했습니다." });
//   }
// };

export const updateService = async (req, res) => {
  const projectId = req.params.id; // URL 파라미터에서 projectId 가져오기
  const { stepData, currentStep } = req.body; // 요청 본문에서 stepData 가져오기

  try {
    // 업데이트할 스텝 필드명을 동적으로 생성
    const stepField = `step${currentStep}`;

    // Mongoose의 findByIdAndUpdate 메소드를 비동기 함수로 사용
    const updatedProject = await Service.findByIdAndUpdate(
      projectId, // 업데이트할 프로젝트의 ID
      { $set: { [stepField]: stepData, currentStep } }, // 해당 스텝 데이터만 업데이트
      { new: true, runValidators: true } // 새로운 값을 반환하고 유효성 검사를 실행
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "프로젝트를 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: `프로젝트 Step ${currentStep} 업데이트 성공`,
      updatedProject,
    });
  } catch (error) {
    console.error(
      `프로젝트 Step ${currentStep} 업데이트 중 오류 발생: /n`,
      error
    );
    res
      .status(500)
      .json({ error: "프로젝트 업데이트 중 오류가 발생했습니다." });
  }
};

// 특정 서비스 삭제
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: "서비스를 찾을 수 없습니다." });
    }
    res.status(200).json({ message: "서비스가 성공적으로 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ error: "서비스 삭제 중 오류가 발생했습니다." });
  }
};
