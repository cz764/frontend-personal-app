import * as api from "../api/account";
import { message } from "antd";

export function getCaptcha(payload = {}) {
  return async () => {
    const { code, message: msg, captcha = {} } = await api.getCaptcha(payload);
    if (code === 20018) {
      message.succsss(`${msg}, Captcha is ${captcha}`);
    } else {
      message.error(msg);
    }
  };
}

export function register(payload = {}) {
  return async () => {
    const { code, message: msg } = await api.register(payload);
    if (code === 20023) {
      message.success(msg);
    } else {
      message.error(msg);
    }
  };
}

export function login(payload = {}) {
  return async () => {
    const { code, message: msg, data: { token } = {} } = await api.login(
      payload
    );
    if (code === 0) {
      message.success(msg);
      console.log(token);
      window.localStorage.setItem("personal-app-token", token);
      window.location.href = "/";
    } else {
      message.error(msg);
    }
  };
}
