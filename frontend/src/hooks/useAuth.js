// api
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function useAuth() {
  async function register(user) {
    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return { register };
}
