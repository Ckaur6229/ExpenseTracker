import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
const [formError, setFormError] = useState({});
  
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      alert("You are already logged in")
      nav("/");
    }
  },[]);
  const nav=useNavigate();
  const handleUser = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password is incorrect";
    }
  
    return errors;
  };
  const submitUser = async(e) => {
    e.preventDefault();
    const errors = validate(user);
    setFormError(errors);

    if (Object.keys(errors).length > 0) return;
    try {
      const response=await fetch(`http://localhost:8080/api/auth/login`,{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify(user)
      })
      if(response.ok){
        alert("Login Successful")
        const resData=await response.json();
        console.log(resData)
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("email", resData.email);
        setUser({email:"",password:""})
        nav("/dashboard")
      }
      else{
        console.log("Invalid Credentials")
        alert("Invalid Credentils! Try again")
      }
    } catch (error) {
      console.log("LoginError", error)
      alert(error)
    }
  };
  return (
    <>
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
            <h3 className="pt-4 fw-bold text-center">Login</h3>
            <h6 className="text-center">Please login to continue</h6>
            <form onSubmit={submitUser}>
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
        
            {/* <div className="d-flex justify-content-between pt-2">
              <div className="fs-6">
                <input type="checkbox" className="form-check-input" />&nbsp;Keep me
                logged in
              </div>
              <div className="me-4">Forget Password?</div>
            </div> */}
            <button
              className="btn mt-3 d-block mx-auto w-100 text-white"
              style={{ backgroundColor: "rgb(76, 72, 136)" }}
            >
              LOGIN
            </button>
            </form>
            <h6 className="pt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "rgb(76, 72, 136)", textDecoration: "none" }}
              >
                Sign up
              </Link>
            </h6>
            {/* <h6 className="text-center mt-3">Or</h6>
            <h6 className="text-center">Login with</h6>
            <div className="d-flex justify-content-center py-3">
              <div className="ps-5">
                <img src="facebook.png" className="img-fluid" width="20px" />
              </div>
              <div className="ps-5">
                <img src="twitter.png" className="img-fluid" width="20px" />
              </div>
              <div className="ps-5">
                <img src="google.png" className="img-fluid" width="20px" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
