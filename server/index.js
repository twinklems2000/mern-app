const express = require("express");
const { connectToDb } = require("./db/config");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/userModel");
const { validationResult } = require("express-validator");
const { registerValidators } = require("./utils/validators");

connectToDb();

const app = express();

app.use(express.json());

app.use(cors());

const jwtkey = "userdemo";

app.post("/register", registerValidators, async (req, res) => {
  let error = validationResult(req);

  const { email } = req;

  if (!error.isEmpty()) {
    res.send(error);
  } else {
    let user = new User(req.body);

    const userExist = await User.findOne({ email });

    if (userExist !== null) {
      res.status(400).send({
        errors: [{ msg: "User already exist" }],
      });
    } else {
      let result = await user.save();

      Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.status(400).send({
            errors: [
              { msg: "Something went wrong , please try after sometime" },
            ],
          });
        }

        const hashPassword = bcrypt.hashSync(result.password, 10);
        result.password = hashPassword;
        result = result.toObject();
        res.status(200).json({ result, auth: token });
      });
    }
  }
});

app.post("/login", registerValidators, async (req, res) => {
  let error = validationResult(req);

  if (!error.isEmpty()) {
    res.send(error);
  } else {
    let result = await User.findOne(req.body).select("-password");
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send("Something went wrong, please try after some time");
      }
      res.send({ result, auth: token });
    });
  }
});

app.get("/getAllUsers", async (req, res) => {
  let userData = await User.find();
  if (userData.length > 0) {
    res.send(userData);
  } else {
    res.send([]);
  }
});

app.delete("/getAllUsers/:id", async (req, res) => {
  let result = await User.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.listen(process.env.PORT);
