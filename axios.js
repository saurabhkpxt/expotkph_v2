
import axios from "axios";

const instance = axios.create({
  baseURL: "https://prbackend-1.saurabhsharma19.repl.co/api",
});

export default instance;