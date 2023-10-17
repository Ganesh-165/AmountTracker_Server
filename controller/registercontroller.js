const registercollection = require("../models/registermodel");
const bcrypt = require("bcrypt");

exports.postregistercontroller = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const response = await registercollection.findOne({ email });
    if (response)
      return res
        .status(200)
        .json({ success: false, message: "Emial Already Registered" });
    const encryptedpassword = await bcrypt.hash(password, 10);
    const newUser = new registercollection({
      email: email,
      username: username,
      password: encryptedpassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Registered SuccsessFully" });
  } catch (err) {
    console.log("Regsiter Err", err);
  }
};
