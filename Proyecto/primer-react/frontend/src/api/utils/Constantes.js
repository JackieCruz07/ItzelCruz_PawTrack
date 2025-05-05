/* export const ENV = {
    BASE_API: process.env.REACT_APP_API_URL || "http://localhost:4000/api/v1",
    JWT_KEY: "token",
    ROLES: {
      USER: "user",
      ADMIN: "admin"
    }
  }; */

  const localH = "http://localhost:4000/api";

export const ENV = {
  BASE_API: localH,
  API_ROUTES: {
    AUTH: {
      REGISTER: "/auth/register",
      LOGIN: "/auth/login",
      ME: "/auth/me",
      AVATAR: "/auth/avatar"
    },
    USERS: "/users"
  },
  UPLOADS: {
    AVATARS: "http://localhost:4000/uploads/avatars"
  }
};