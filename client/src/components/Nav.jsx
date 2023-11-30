import React from "react";
import "../styles/nav.css";

function Nav({ setIsSignUp, setIsCallModal }) {
  const handleClick = () => {
    setIsSignUp(true);
    setIsCallModal(true);
  };
  return (
    <div className="nav__container">
      <img src="images/tinder_logo_white.png" alt="logo" />
      <button onClick={handleClick}>Log in</button>
    </div>
  );
}

export default Nav;
