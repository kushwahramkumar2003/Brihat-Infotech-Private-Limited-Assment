import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.withCredentials = true;

export const getPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data;
};
