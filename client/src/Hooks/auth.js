
import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {

  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const login = useCallback((jwtToken, userId) => {
    setToken(jwtToken);
    setId(userId);

    localStorage.setItem(storageName, JSON.stringify({ id: userId, token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    // todo: validate expiration
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token && data.id) {
      login(data.token, data.id);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, id, ready }
}