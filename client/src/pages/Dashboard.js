import React from "react";
import TinderCard from "react-tinder-card";
import { useState } from "react";
import "../styles/dashboard.css";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [users, setUsers] = useState([]);
  const [showMeState, setShowMeState] = useState("");
  const userId = cookies.uuid;

  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user", {
        params: { userId },
      });

      // setShowMeState(response.data.showMe);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    removeCookie("uuid");
    removeCookie("token");
    removeCookie("email");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="dashboard__nav__container">
        <img src="/images/color-logo-tinder.png" alt="" />
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="dashboard__container">
        <section>hello</section>
        <section>
          {users.map((user) => (
            <TinderCard
              className="swipe"
              preventSwipe={["up", "down"]}
              key={user.uuid}
            >
              <div
                style={{ backgroundImage: `url(${user?.url})` }}
                className="card"
              >
                <h1>{user?.firstName}</h1>
              </div>
            </TinderCard>
          ))}
        </section>
      </div>
    </>
  );
}

export default Dashboard;
