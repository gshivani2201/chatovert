import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";

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

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Username",
    });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  sendToken(res, user, 200, "Login successful.");
};

export { login, newUser };
