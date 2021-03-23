import axios from "axios";

function getAxiosInstance(option) {
  const instance = axios.create();
  return instance;
}

function makeGet() {
  return function (url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: "get",
      ...option,
    });
  };
}

function makePost() {
  return function (url, option) {
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: "post",
      ...option,
    });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: makeGet(),
  post: makePost(),
};
