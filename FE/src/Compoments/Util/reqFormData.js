import axios from "axios";
const req = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        'Content-Type': 'multipart/form-data',
      },
});

export const put = async (path,data) => {
    const res = await req.put(path,data);
    return res.data;
}
export const post = async (path,data) => {
    const res = await req.post(path,data);
    return res.data;
}
export default req;