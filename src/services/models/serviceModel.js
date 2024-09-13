import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // _id 필드를 String으로 지정하여 UUID 저장 가능
      required: true,
    },
    currentStep: {
      type: Number,
      default: 1,
      min: 1,
      max: 7,
    },

    // Step 1: 팀 정보 설정
    step1: {
      projectName: {
        type: String,
      },
      teamName: {
        type: String,
        default: "",
      },
      framework: {
        type: String,
        default: " ",
      },
      teamMembers: [
        {
          name: {
            type: String,
            default: "",
          },
          role: {
            type: String,
            default: "",
          },
        },
      ],
    },

    // Step 2: 프로젝트 협업 도구 설정
    step2: {
      versionControl: {
        type: String,
        default: "",
      },
      communicationTools: [
        {
          tool: {
            type: String,
            default: "",
          },
          url: {
            type: String,
            default: "",
          },
        },
      ],
      projectManagementTools: [
        {
          tool: {
            type: String,
            default: "",
          },
          url: {
            type: String,
            default: "",
          },
        },
      ],
      designTool: {
        type: String,
        default: "",
      },
    },

    // Step 3: 코드 및 GitHub 컨벤션 설정
    step3: {
      codeConvention: {
        variableNaming: {
          type: String,
          default: "",
        },
        functionNaming: {
          type: String,
          default: "",
        },
        indentation: {
          type: Number,
          default: "",
        },
      },
      githubConvention: {
        commitMessage: {
          type: String,
          default: "",
        },
        branchNaming: {
          type: String,
          default: "",
        },
      },
      fileStructureConvention: {
        type: String,
        default: "",
      },
      fileNameConvention: {
        type: String,
        default: "",
      },
      commentConvention: {
        type: String,
        default: "",
      },
    },

    // Step 5: 데이터베이스 및 ERD 설정
    step5: {
      erdLink: {
        type: String,
        default: "",
      },
    },

    // // Step 6: 프로토타입 생성 상태
    // step6: {
    //   frontendPrototype: {
    //     type: String,
    //     default: "",
    //   },
    //   backendPrototype: {
    //     type: String,
    //     default: "",
    //   },
    //   apiConnection: {
    //     type: String,
    //     default: "",
    //   },
    //   deploymentStatus: {
    //     type: String,
    //     default: "",
    //   },
    // },

    // Step 7: 최종 결과물 및 README 작성
    step7: {
      finalProductUrl: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
