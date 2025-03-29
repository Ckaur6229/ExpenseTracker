import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      alert("You are already Signed in");
      nav("/");
    }
  }, []);

  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    if (!values.name.trim()) {
      errors.name = "Name is required";
    }
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 6 characters, include uppercase, lowercase, a number, and a special character";
    }
  
    return errors;
  };
  

  const submitUser = async (e) => {
    e.preventDefault();
    const errors = validate(user);
    setFormError(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const response = await fetch(`http://localhost:8080/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const resData = await response.json();

      if (response.ok) {
        alert("Register Successful");
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        setUser({ name: "", email: "", password: "" });
        nav('/login')
      } else {
        alert(`Signup failed: ${resData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.log("RegisterError", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 col-lg-6 d-flex align-items-center">
          <img
            src="/assets/img/signImg.jpg"
            className="img-fluid w-100"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
        <div className=" col-lg-6 px-5 col-md-6 col-sm-12 d-flex flex-column justify-content-center">
          <h3 className="pt-4 fw-bold text-center">Sign up</h3>
          <h6 className="text-center">Please Sign up to continue</h6>
          <form onSubmit={submitUser}>
            <div className="row pt-4">
              <div className="col-lg-12">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={user.name}
                  onChange={handleUser}
                />
                <span className="text-danger">{formError.name}</span>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-lg-12">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={user.email}
                  onChange={handleUser}
                />
                <span className="text-danger">{formError.email}</span>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-lg-12">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={user.password}
                  onChange={handleUser}
                />
                <span className="text-danger">{formError.password}</span>
              </div>
            </div>
            <button
              className="btn mt-3 d-block mx-auto w-100 text-white"
              style={{ backgroundColor: "rgb(76, 72, 136)" }}
            >
              SIGN UP
            </button>
          </form>
          <h6 className="pt-2">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "rgb(76, 72, 136)", textDecoration: "none" }}>
              Login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Signup;
