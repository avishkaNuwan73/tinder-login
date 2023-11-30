import React, { useState } from "react";
import "../styles/onboarding.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function OnBoarding() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: cookies.uuid,
    firstName: "",
    dob_month: "",
    dob_date: "",
    dob_year: "",
    gender: "",
    showMe: "",
    showGender: false,
    url: "",
    about_me: "",
    matches: [],
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    // console.log(form);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put("http://localhost:4000/user", { form });
    console.log(response);
    if (response) navigate("/dashboard");
  };

  return (
    <div className="container">
      <nav className="nav">
        <img src="/images/color-logo-tinder.png" alt="" />
      </nav>
      <div className="header">
        <h1>CREATE ACCOUNT</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <section>
          <div className="first__name">
            <label htmlFor="fistName">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="dob">
            <label htmlFor="dob">Birthday</label>
            <div className="dob__inputs">
              <input
                type="number"
                name="dob_month"
                placeholder="MM"
                required
                value={form.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_date"
                placeholder="DD"
                required
                value={form.dob_date}
                onChange={handleChange}
              />
              <input
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required
                value={form.dob_year}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="gender">
            <label htmlFor="gender">Gender</label>
            <div className="radio">
              <input
                type="radio"
                name="gender"
                id="man_gender"
                value="man"
                onChange={handleChange}
                checked={form.gender === "man"}
              />
              <label htmlFor="man_gender">Man</label>
              <input
                type="radio"
                name="gender"
                id="woman_gender"
                value="woman"
                onChange={handleChange}
                checked={form.gender === "woman"}
              />
              <label htmlFor="woman_gender">Woman</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                name="showGender"
                id="showGender"
                onChange={handleChange}
                checked={form.showGender}
              />
              <label htmlFor="showGender">Show my gender on my profile</label>
            </div>
          </div>
          <div className="show__me">
            <label htmlFor="showMe">Show me</label>
            <div className="radio">
              <input
                type="radio"
                name="showMe"
                id="men_show"
                required
                checked={form.showMe === "men"}
                onChange={handleChange}
                value="men"
              />
              <label htmlFor="men_show">Men</label>
              <input
                type="radio"
                name="showMe"
                id="women_show"
                required
                checked={form.showMe === "women"}
                onChange={handleChange}
                value="women"
              />
              <label htmlFor="women_show">Women</label>
              <input
                type="radio"
                name="showMe"
                id="everyone_show"
                required
                checked={form.showMe === "everyone"}
                onChange={handleChange}
                value="everyone"
              />
              <label htmlFor="everyone_show">Everyone</label>
            </div>
          </div>
          <div className="about__me">
            <label htmlFor="about-me">About me</label>
            <input
              type="text"
              name="about_me"
              value={form.about_me}
              onChange={handleChange}
            />
          </div>
          <div className="submit">
            <input type="submit" />
          </div>
        </section>
        <section>
          <label htmlFor="profile">Profile photo</label>
          <input
            type="url"
            name="url"
            required
            onChange={handleChange}
            value={form.url}
          />
          <div className="img__container">
            <img src={form.url} alt="" />
          </div>
        </section>
      </form>
    </div>
  );
}

export default OnBoarding;
