import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type" : "application/json",
  },
});
export const get = async (path) => {
    const response = await api.get(path);
  return response.data;
};
export const post = async (path, data) => {
  const response = await api.post(path, data);
  return response.data;
};
export const put = async (path, data) => {
    const response = await api.put(path,data);
    return response.data;
};
export const del = async (path) => {
    const response = await api.delete(path);
    return response.data;
}

export default api;
