
import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../Hooks/http";
import { useMessage } from "../Hooks/message";
import { AuthContext } from "../Context/auth";

function Auth() {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    name: "",
    password: ""
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/login", "POST", JSON.stringify({ ...form }), { 
        "Content-Type": "application/json" 
      });
      const { accessToken, id } = data;
      auth.login(accessToken, id);
      
    } catch(e) {}
  }

  const registerHandler = async () => {
    try {
      const data = await request("/register", "POST", JSON.stringify({ ...form }), { 
        "Content-Type": "application/json" 
      });
      message(data.message);

    } catch(e) {}
  }

  return (
    <div>
      <h1>Auth</h1>
      <div>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter your name!"
          value={form.name}
          onChange={changeHandler}
        />
      </div>
      <div>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter your password!"
          value={form.password}
          onChange={changeHandler}
        />
      </div>
      <div>
        <button 
          onClick={loginHandler}
          disabled={loading}
        >Login</button>
        <button 
          onClick={registerHandler}
          disabled={loading}
        >Register</button>
      </div>
    </div>
  )
}

export default Auth;
