import API from "@/lib/axios";
export const login = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res;
};
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/register", data);
  return res;
};
export const logout = async () => {
  const res = await API.post("/auth/logout");
  return res;
};
export const getCurrentUser = async ()=>{
  const res = await API.get("/auth/me")
  return res
}
