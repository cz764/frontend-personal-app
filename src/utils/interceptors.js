const responseInterceptors = [
  {
    name: "formatResponse",
    success(response) {
      return response.data;
    },
  },
];

const interceptors = {
  response: responseInterceptors,
};

function doInstall(instance, option = {}) {
  const { type } = option;
  interceptors[type].forEach((interceptor) => {
    const { success, fail } = interceptor;
    instance.interceptors[type].use(success, fail);
  });
}

export function install(instance, option = {}) {
  doInstall(instance, {
    type: "response",
  });
}
