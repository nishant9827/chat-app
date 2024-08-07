import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/login.css";
import Spinner from "../components/Spinner";
import { registerRoute } from "../utils/ApiRoutes";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [isLoading, SetIsLoading] = useState(false);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInputVal(() => {
      return { ...inputVal, [name]: value };
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    SetIsLoading(true);
    const { username, email, password, cPassword } = inputVal;
    if (username === "") {
      toast.error("Please enter your username");
      SetIsLoading(false);
    } else if (email === "") {
      toast.error("Please enter your email");
      SetIsLoading(false);
    } else if (password === "") {
      toast.error("Enter your password");
      SetIsLoading(false);
    } else if (password.length < 6) {
      toast.error("Password must be 6 char");
      SetIsLoading(false);
    } else if (cPassword !== password) {
      toast.error("Password and confirm password not match");
      SetIsLoading(false);
    } else {
      try {
        const data = await fetch(`${registerRoute}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        const resp = await data.json();
        if (resp.status === true) {
          SetIsLoading(false);
          toast.success("Registered Successfully");
          setInputVal({
            ...inputVal,
            username: "",
            email: "",
            password: "",
            cPassword: "",
          });
          localStorage.setItem("userData", JSON.stringify(resp.result));
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
      <h2 className="loginHeading">Register</h2>
      <form onSubmit={submitData}>
        <div className="formGroup">
          <input
            type="text"
            className="formElement"
            name="username"
            autoComplete="off"
            onChange={setVal}
            required
            value={inputVal.name}
          />
          <label className="floatingLabel">Username</label>
        </div>
        <div className="formGroup">
          <input
            type="text"
            className="formElement"
            name="email"
            autoComplete="off"
            onChange={setVal}
            required
            value={inputVal.email}
          />
          <label className="floatingLabel">Email</label>
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
        <div className="formGroup">
          <input
            type="password"
            className="formElement"
            name="cPassword"
            autoComplete="off"
            onChange={setVal}
            required
            value={inputVal.cPassword}
          />
          <label className="floatingLabel">Confirm Password</label>
        </div>
        <button className="submitButton mt-2">
          {isLoading ? <Spinner /> : "Submit"}
        </button>
        <span className="already_span">
          Already Have An Account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
