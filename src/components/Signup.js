import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const host = "http://localhost:5000";
    // API call
    const { name, email, password, cpassword } = details;

    if (password !== cpassword) {
      props.showAlert("Passwords does not match", "error");
    } else {
      const response = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        // save auth-token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
      } else {
        // alert(json.error);
        json.error != undefined
          ? props.showAlert(json.error, "error")
          : props.showAlert(json.errors[0].msg, "error");
      }
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row mt-5 justify-content-md-center">
        <h2 className="display-2 text-center my-3">Create Account</h2>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label htmlFor="name" className="form-label">
                Name
              </label> */}
              <input
                placeholder="Name"
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
              {/* <label htmlFor="email" className="form-label">
                Email address
              </label> */}
              <input
                placeholder="Email"
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
              {/* <label htmlFor="password" className="form-label">
                Password
              </label> */}
              <input
                placeholder="Password"
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
              {/* <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label> */}
              <input
                placeholder="Confirm Password"
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

            <button type="submit" className="btn btn-primary mt-2">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
