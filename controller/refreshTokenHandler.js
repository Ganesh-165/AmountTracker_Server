const jwt = require("jsonwebtoken");
const registercollection = require("../models/registermodel");

exports.refTokenHandler = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (!cookie.jwt) return res.sendStatus(401);
    const refreshToken = cookie.jwt;
    const foundUser = await registercollection.findOne({
      refreshToken: refreshToken,
    });
    if (!foundUser) res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESHTOKENSECRET, (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
          },
        },
        process.env.ACCESSTOKENSECRET,
        { expiresIn: "10s" }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    console.log("Refresh Token err", err);
  }
};
