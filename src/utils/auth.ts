const login = (token: string) => {
  localStorage.setItem("token", token);
};
const logout = () => {
  localStorage.clear();
};

const setUser = (user: string) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const isLogin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export { login, isLogin, logout, setUser, getUser, getToken };
