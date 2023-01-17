import axios from "axios";

const baseUrl = "/api/login";

const login = async (userCredentials) => {
  const res = await axios.post(baseUrl, userCredentials)
  return res.data
}

export default { login }