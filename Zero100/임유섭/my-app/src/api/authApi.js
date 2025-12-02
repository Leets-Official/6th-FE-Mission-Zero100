import apiClient from "./client";

export const kakaoRedirect = async (code) => {
  const res = await apiClient.get("/auth/kakao/redirect", {
    params: { code },
  });

  const result = res.data;
  // result 구조:
  // {
  //   code,
  //   message,
  //   data: {
  //     httpStatus,
  //     responseMessage,
  //   }
  // }

  return {
    code: result.code,
    message: result.message,
    httpStatus: result.data?.httpStatus,
    responseMessage: result.data?.responseMessage,
  };
};
