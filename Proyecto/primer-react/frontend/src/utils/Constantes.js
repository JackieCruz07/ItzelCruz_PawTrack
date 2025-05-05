import { } from "../services/Axios";

const localH = "http://localhost:4000/api";

export const ENV = {
  BASE_API: localH,
  API_ROUTES: {
    PETS: "/pets",
    CATEGORIZED: "/pets/categorized",
    DOCUMENTS: "/pets/uploads/documents",
    APPOINTMENTS: "/appointments",
    
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