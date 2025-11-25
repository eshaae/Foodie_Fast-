import React, { useState, useEffect } from "react";
import PublicLayout from "./PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
    password: "",
    repeatpassword: ""
  });

  //useNavigate to navigate into another page
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      mobilenumber,
      email,
      password,
      repeatpassword,
    } = formData;

    if (password !== repeatpassword) {
      toast.error("Password and confirm password doesnot match!!!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          mobilenumber,
          email,
          password
        })
      });

      const result = await response.json();

      if (response.status === 201) {
        toast.success(result.message || "You have successfully registered.");

        setFormData({
          firstname: "",
          lastname: "",
          mobilenumber: "",
          email: "",
          password: "",
          repeatpassword: ""
        });

        setTimeout(( )=>{
            navigate('/login')

          },2000);
      } else {
        toast.error(result.message || "something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };
  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <div className="row shadow-lg rounded-4">
          <div className="col-md-6 p-4">
            <h3 className="text-center mb-4">
              <i className="fas fa-user-plus me-2"></i>User Registration
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="firstname"
                  type="text"
                  className="form-control"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="FirstName"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  name="lastname"
                  type="text"
                  className="form-control"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="LastName"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  name="mobilenumber"
                  type="text"
                  className="form-control"
                  value={formData.mobilenumber}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  name="repeatpassword"
                  type="password"
                  className="form-control"
                  value={formData.repeatpassword}
                  onChange={handleChange}
                  placeholder="Repeat Password"
                  required
                />
              </div>

              <button className="btn btn-primary w-100">
                <i className="fas fa-user-check me-2"></i>Register
              </button>
            </form>
          </div>

          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="p-4 text-center">
              <img
                src="/images/registration.png"
                className="img-fluid"
                style={{ maxHeight: "400px" }}
              />
              <h5 className="mt-3"> Registration is fast , secure. </h5>
              <p className="text-muted small">
                Join our food family and enjoy delicious food delivered to your
                door.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Register;
