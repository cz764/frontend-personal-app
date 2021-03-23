import * as api from "../api/register";
import { message } from "antd";

export function getCaptcha(payload = {}) {
  return async () => {
    const {
      data: { code, message: msg, data: { captcha } = {} },
    } = await api.getCaptcha(payload);
    if (code === 20018) {
      message.succsss(`${msg}, Captcha is ${captcha}`);
    } else {
      message.error(msg);
    }
  };
}

export function register(payload = {}) {
  return async () => {
    const {
      data: { code, message: msg },
    } = await api.register(payload);
  };
}
