import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginRoute } from "../utils/ApiRoutes";
import Spinner from "../components/Spinner";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState({
    username: "",
    password: "",
  });
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      navigate("/");
    }
  }, [navigate]);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    const { username, password } = inputVal;
    if (username === "") {
      SetIsLoading(false);
      toast.error("Please enter your username");
    } else if (password === "") {
      SetIsLoading(false);
      toast.error("Enter your password");
    } else {
      try {
        const data = await fetch(`${loginRoute}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const resp = await data.json();
        if (resp.status) {
          SetIsLoading(false);
          toast.success("Login Successfully");
          setInputVal({ ...inputVal, username: "", password: "" });
          localStorage.setItem(
            "userData",
            JSON.stringify(resp.result.usernameCheck)
          );
          navigate("/");
        } else {
          SetIsLoading(false);
          toast.error(resp.msg);
        }
      } catch (error) {
        SetIsLoading(false);
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="loginBox">
      <h2 className="loginHeading">Login</h2>
      <form onSubmit={submitData}>
        <div className="formGroup">
          <input
            type="text"
            className="formElement"
            name="username"
            autoComplete="off"
            onChange={setVal}
            required
            value={inputVal.username}
          />
          <label className="floatingLabel">username</label>
        </div>
        <div className="formGroup">
          <input
            type="password"
            className="formElement"
            name="password"
            autoComplete="off"
            onChange={setVal}
            required
            value={inputVal.password}
          />
          <label className="floatingLabel">Password</label>
        </div>
        <button className="submitButton mt-2">
          {isLoading ? <Spinner /> : "Login"}
        </button>
        <span className="already_span">
          Don't Have An Account ? <Link to={"/signup"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
