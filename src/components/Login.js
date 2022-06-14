import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const host = "http://localhost:5000";
    // API call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save auth-token and redirect
      localStorage.setItem("token", json.authToken);
      history("/");
      props.showAlert("Welcome " + json.name.toUpperCase(), "success");
      // console.log(json);
    } else {
      // alert("Invalid Credentials");
      json.error != undefined ? props.showAlert(json.error, "error") : props.showAlert(json.errors[0].msg, "error");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row mt-5 justify-content-md-center">
        <h2 className="display-2 text-center my-3">Login</h2>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="email" className="form-label">
                Email address
              </label> */}
              <input
              placeholder="Email"
                type="email"
                name="email"
                className="form-control"
                value={credentials.email}
                onChange={onChange}
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="password" className="form-label">
                Password
              </label> */}
              <input
              placeholder="Password"
                type="password"
                name="password"
                className="form-control"
                value={credentials.password}
                onChange={onChange}
                id="password"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
