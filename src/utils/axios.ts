import axios from "axios";

export const axiosInt = axios.create();
axiosInt.defaults.headers.common["Accept-Language"] = "en";
