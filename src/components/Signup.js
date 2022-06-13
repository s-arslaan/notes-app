import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const host = "http://localhost:5000";
    // API call
    const { name, email, password } = details;
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save auth-token and redirect
      localStorage.setItem("token", json.authToken);
      history("/");
    } else {
      alert(json.error);
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row mt-5 justify-content-md-center">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                onChange={onChange}
                aria-describedby="nameHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={onChange}
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={onChange}
                minLength={5}
                aria-describedby="passwordHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                className="form-control"
                id="cpassword"
                onChange={onChange}
                minLength={5}
                aria-describedby="passwordHelp"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
