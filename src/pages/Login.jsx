import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" });

  function handleLogin(e) {
    e.preventDefault();
    
    let valid = true;
    let currentErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      currentErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      currentErrors.email = "Please enter a valid email format ";
      valid = false;
    }

    if (!password) {
      currentErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      currentErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(currentErrors);
    if (!valid) return;

    alert("Login Successful");
    navigate("/home")
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {errors.email && <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {errors.password && <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>{errors.password}</p>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;