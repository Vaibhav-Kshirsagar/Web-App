import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="form-wrap">
          <span className="logo">My Chat</span>
          <span className="title">Login</span>
          <form action="" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button className="btn">Sign in</button> 
            {err && <span>Something went wrong</span>}
          </form>
          <p className="p">You don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
