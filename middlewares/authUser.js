const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Roles = require("../models/roles");
module.exports = async (req, res, next) => {
  const token = req.get("token");

  try {
    let decodedtoken = await jwt.verify(token, "feriahermanaAPI2425");

    if (decodedtoken) {
      let user = await User.findById(decodedtoken.userId);
      let getRole = await Roles.findById(user.roles);

      if (getRole.name === "user" || "admin") {
        req.userId = decodedtoken.userId;
        req.roles = decodedtoken.roles;
        next();
      } else {
        return res.status(401).json({ message: "Unahutorized" });
      }
    } else {
      return res.status(401).json({ message: "incorrect token" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
