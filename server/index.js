// imports
const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

main().catch((err) => console.log(err));

async function main() {
  const PORT = 4000;
  const URI =
    "mongodb+srv://avishkanuwan73:12345Avishka@cluster0.ijwojwx.mongodb.net/Cluster0?retryWrites=true&w=majority";
  await mongoose.connect(URI);
  //uses
  const cors = require("cors");
  const app = express();

  // **********************************************middlewares*******************************
  app.use(cors());
  app.use(express.json());

  //******************************************modals*************************************************

  const UserSchema = mongoose.Schema({
    uuid: String,
    email: String,
    password: String,
    firstName: String,
    dob_month: String,
    dob_date: String,
    dob_year: String,
    gender: String,
    showMe: String,
    showGender: Boolean,
    url: String,
    about_me: String,
    matches: Array,
  });

  const User = mongoose.model("Users", UserSchema);

  //**************************** */ routes*********************************************************
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const generateUid = uuidv4();
    const hashPassword = await bcrypt.hash(password, 10);

    const data = {
      uuid: generateUid,
      email,
      password: hashPassword,
    };
    const token = jwt.sign({ email, generateUid }, "secret", {
      expiresIn: 60 * 60,
    });

    const logedUsers = await User.findOne({ email });
    if (logedUsers) res.status(400).send("email is already exist");
    else {
      const newUser = new User(data);
      await newUser.save();
      res.status(201).json({ email, uuid: generateUid, token });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const correctPassword = await bcrypt.compare(password, user.password);
      if (user && correctPassword) {
        const token = jwt.sign({ email, user }, "secret", {
          expiresIn: 60 * 60,
        });
        return res.status(201).json({ token, email, uuid: user.uuid });
      }
      res.status(400).send();
    } catch (error) {
      console.error(error);
    }
  });
  app.put("/user", async (req, res) => {
    const formData = req.body.form;
    const id = formData.userId;
    try {
      // console.log(formData.userId);

      const updateDocument = {
        $set: {
          firstName: formData.firstName,
          dob_month: formData.dob_month,
          dob_date: formData.dob_date,
          dob_year: formData.dob_year,
          gender: formData.gender,
          showMe: formData.showMe,
          showGender: formData.showGender,
          url: formData.url,
          about_me: formData.about_me,
          matches: formData.matches,
        },
      };

      const findTheUser = await User.findOne({ uuid: id });
      // console.log(findTheUser);
      const updateUser = await findTheUser.updateOne(updateDocument);
      // console.log(updateUser);
      if (updateUser.acknowledged) return res.status(200).send(updateUser);
      res.status(400).send();
    } catch (error) {
      console.error(error);
    }
  });

  app.get("/users", async (req, res) => {
    // const query = {showMe:"women"};
    try {
      const showMe = req.query.showMeState;
      const query = { showMe: showMe };
      const members = await User.find();

      res.status(200).send(members);
    } catch (error) {
      console.error(error);
    }
  });

  app.get("/user", async (req, res) => {
    try {
      const userId = req.query.userId;
      const query = { uuid: userId };
      const user = await User.findOne(query);

      if (user) return res.status(200).send(user);
      res.status(400).send();
    } catch (error) {
      console.error(error);
    }
  });

  const query = { showMe: "women" };
  const members = await User.find(query);
  console.log(members);

  //app listen
  app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
}
