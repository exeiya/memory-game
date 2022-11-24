const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body
  try {
    const user = await User.findOne({ username })
    console.log("checking credentials...", user)
    const passwordCheck = user ? await bcrypt.compare(password, user.passwordHash) : false
    console.log(passwordCheck)

    if (!passwordCheck) {
      return response.status(401).json({
        error: "Invalid username or password"
      })
    }

    const tokenUser = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(tokenUser, process.env.JWT_AUTH_KEY_SECRET)

    response.status(200).send({ ...tokenUser, token })

    response.status(418).end()
  } catch (error) {
    console.log("error while logging in:", error)
  }

})

module.exports = loginRouter;