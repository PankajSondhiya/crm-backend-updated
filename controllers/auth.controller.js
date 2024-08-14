const User = require("./../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../configs/firebaseAdmin");
const SECRET_KEY = require("../configs/auth.config");
const { USERTYPES, USER_STATUS } = require("./../constant");

async function signup(req, res) {
  const { name, email, userId, password, userType } = req.body;

  const userRecord = await admin
    .auth()
    .createUser({ email: email, password: password });
  console.log(userRecord);

  if (userType === "ADMIN") {
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
  }
  const userObj = {
    name,
    email,
    userId,
    password: bcrypt.hashSync(password, 10),
    userType,
    userStatus:
      userType === USERTYPES.CUSTOMER
        ? USER_STATUS.APPROVED
        : USER_STATUS.PENDING,
    firebaseUid: userRecord.uid,
  };

  User.create(userObj)
    .then((data) => {
      res.status(200).send({
        _id: data._id,
        name: data.name,
        email: data.email,
        userId: data.userId,
        userType: data.userType,
        userStatus: data.userStatus,
        firebaseUid: userRecord.uid,
      });
    })
    .catch((err) => res.status(400).send(err));
}

async function signin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user === null) {
    res.status(401).send({
      message: "Failed! UserId does not exist",
    });
    return;
  }

  if (user.userStatus !== USER_STATUS.APPROVED) {
    res.status(401).send({
      message: "Cannot allow login as user is not approved yet",
    });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    res.status(401).send({
      message: "Password is invalid",
    });
    return;
  }

  // JWT token

  const accessToken = jwt.sign(
    {
      userId: user.userId,
      userType: user.userType,
      email: user.email,
    },
    SECRET_KEY,
    {
      expiresIn: "6h",
    }
  );

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    userType: user.userType,
    userStatus: user.userStatus,
    accessToken,
  });
}

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send("password changed successfuly");
  } catch (error) {}
};

module.exports = {
  signup,
  signin,
  resetPassword,
};
