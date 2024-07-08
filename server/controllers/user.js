import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "abjk",
    url: "akln",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User created successfully!");
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Username", 404));
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Password", 404));
    }

    sendToken(res, user, 200, "Login successful.");
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res) => {};

export { login, newUser, getMyProfile };
