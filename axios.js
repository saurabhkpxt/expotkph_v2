
import axios from "axios";

const instance = axios.create({
  baseURL: "http://ssaurabh8778.pythonanywhere.com/tkphapi",
});

export default instance;