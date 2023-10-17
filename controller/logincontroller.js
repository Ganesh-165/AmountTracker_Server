const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registercollection = require("../models/registermodel");

exports.postLoginData = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await registercollection.findOne({ email: email });
    if (response) {
      const bcryptpwd = await bcrypt.compare(password, response.password);
      const userid = response._id;
      const username = response.username;
      if (bcryptpwd) {
        const email = response.email;
        const password = response.password;
        const accessToken = jwt.sign(
          {
            UserInfo: {
              email: email,
              password: password,
            },
          },
          process.env.ACCESSTOKENSECRET,
          { expiresIn: "10s" }
        );
        const refreshToken = jwt.sign(
          { email: email },
          process.env.REFRESHTOKENSECRET,
          { expiresIn: "1d" }
        );
        await registercollection.findOneAndUpdate(
          { email: email },
          { $set: { refreshToken: refreshToken } }
        );
        res.cookie("jwt", refreshToken, {
          domain:'https://amounttracker-client.onrender.com',
          httpOnly: false,
          maxAge: 24*3600*1
        });
        return res.json({
          accessToken,
          email,
          userid,
          username,
          message: "Login Sucssesfully",
        });
      }
      return res.send({ message: "Invalid password", status: false });
    }
    res.send({ message: "Invalid email", status: false });
  } catch (err) {
    console.log("Login Err", err);
  }
};
