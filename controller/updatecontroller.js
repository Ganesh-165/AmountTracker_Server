const bcrypt = require("bcrypt");

const registercollection = require("../models/registermodel");
const userdatacollection = require("../models/datamodel");

exports.patchupdatecontroller = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const response = await registercollection.findOne({ email });
    if (!response)
      return res
        .status(200)
        .json({ status: false, message: "Email does not Exists" });
    const bcryptpassword = await bcrypt.hash(password, 10);
    await registercollection.findOneAndUpdate(
      { email: email },
      { $set: { password: bcryptpassword, username: username } }
    );
    res.status(200).json({ status: true, message: "Updated Sucssesfully" });
  } catch (err) {
    console.log("Update Err", err);
  }
};

exports.patchitemupdatecontroller = async (req, res, next) => {
  try {
    const { id, title, date, amount, amounttype } = req.body;
    const response = await userdatacollection.findOne({ _id: id });
    if (!response)
      return res
        .status(200)
        .json({ status: false, message: "Item does not exists" });
    await userdatacollection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          date: new Date(date),
          amount: amount,
          amounttype: amounttype,
        },
      }
    );
    res.status(200).json({ status: true, message: "Updated Sucssesfully" });
  } catch (err) {
    console.log("Item Upadet Err", err);
  }
};
