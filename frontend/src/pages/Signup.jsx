import React, { useState } from "react";
import Button from "../components/Button";
import AuthRedirect from "../components/AuthRedirect";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    try {
      const response = await axios.post(
        " http://localhost:3000/api/v1/user/signup",
        data
      );
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("error while signingup", err);
    }
  }
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg border border-gray-700 shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Sign Up
        </h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-black text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-800 text-black placeholder-gray-500 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-black text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-800 text-black placeholder-gray-500 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-transparent border-b border-gray-800 text-black placeholder-gray-500 focus:outline-none focus:border-black"
            />
          </div>

          <Button label="Sign up" />

          <AuthRedirect text="Already have an account?" label="SignIn" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
