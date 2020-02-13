import axios from "axios";
import config from "./config";

export const axiosMovies = axios.create({
  baseURL: config.API_URL,
  params: {
    api_key: config.MOVIE_DB_API_KEY,
    language: "en-US"
  }
});


axiosMovies.interceptors.request.use(conf => {
  conf.params.api_key = config.MOVIE_DB_API_KEY;
  conf.params.language = conf.params.laguage;
  return conf
})
