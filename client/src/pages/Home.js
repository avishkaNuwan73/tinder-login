import React from "react";
import Nav from "../components/Nav";
import "../styles/home.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Home() {
  const [isCallModal, setIsCallModal] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    comfirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
    // console.log(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignUp && !(user.password === user.comfirmPassword)) {
      console.log("password does not match");
      return;
    }

    const response = await axios.post(
      `http://localhost:4000/${isSignUp ? "login" : "signup"}`,
      {
        email: user.email,
        password: user.password,
      }
    );
    console.log(response);
    if (!isSignUp && response.status === 201) {
      setCookie("email", response.data.email);
      setCookie("uuid", response.data.uuid);
      setCookie("token", response.data.token);
      navigate("/onboarding");
    }
    if (isSignUp && response.status === 201) {
      setCookie("email", response.data.email);
      setCookie("uuid", response.data.uuid);
      setCookie("token", response.data.token);
      navigate("/dashboard");
    }
    window.location.reload();
  };

  const handleClick = () => {
    setIsSignUp(false);
    setIsCallModal(true);
  };

  return (
    <>
      <div className="home__container">
        <Nav setIsSignUp={setIsSignUp} setIsCallModal={setIsCallModal} />
        <div className="home__body">
          <h1>Start Someting epic.</h1>
          <button onClick={handleClick}>Create Account</button>
        </div>
      </div>
      {isCallModal && (
        <div className="modal">
          <div className="modal__content">
            <div className="cross__icon" onClick={() => setIsCallModal(false)}>
              <CloseIcon />
            </div>
            <div className="form__header">
              <img src="/images/tinder-icon.png" alt="logo" />
              {isSignUp ? <h1>Login account</h1> : <h1>Create account</h1>}
              {!isSignUp && (
                <span>
                  By clicking Log In, you agree to our <a>Terms.</a>
                  Learn how we process your date in our <a>Privacy Policy </a>
                  and <a>Cookie Policy</a>
                </span>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                required
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={user.password}
                onChange={handleChange}
              />
              {!isSignUp && (
                <input
                  type="password"
                  placeholder="Comfirm-Password"
                  name="comfirmPassword"
                  required
                  value={user.comfirmPassword}
                  onChange={handleChange}
                />
              )}
              <button type="submit">
                {isSignUp ? <>Login account</> : <>Create account</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
