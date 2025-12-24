import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full min-h-screen flex justify-center items-center lg:pl-[300px] bg-background px-5 py-10">
      <div className="card rounded-2xl p-8 sm:w-[480px] w-full flex flex-col items-center">
        <h1 className="text-primary text-4xl font-extrabold mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col">
            <label className="text-muted-foreground text-sm mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-muted-foreground text-sm mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigateTo("/sign-up")}
            className="link font-semibold cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
