import ajax from "../utils/ajax";
import { HOST } from "../constants";

export function getCaptcha(params) {
  return ajax.post(`${HOST}/user/getCaptcha`, { data: params });
}

export function register(params) {
  return ajax.post(`${HOST}/user/register`, { data: params });
}

export function login(params) {
  return ajax.post(`${HOST}/user/login`, { data: params });
}
