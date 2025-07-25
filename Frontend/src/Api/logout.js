import api from "./api";

export const logout = async () => {
  const response = await api.post("/v1/logout");
  return response;
};
