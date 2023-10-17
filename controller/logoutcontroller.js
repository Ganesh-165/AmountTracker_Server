const registercollection = require("../models/registermodel");

exports.postLogout = async (req, res) => {
  try {
    const cookie = req.cookies;
    const { userid } = req.body;
    if (!cookie.jwt) return res.sendStatus(204);
    const refreshToken = cookie.jwt;
    const response = await registercollection.findOne({
      refreshToken: refreshToken,
    });
    if (!response) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
    await registercollection.findOneAndUpdate(
      { userid: userid },
      { $set: { refreshToken: undefined } }
    );
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (err) {
    console.log("Logout Err", err);
  }
};
