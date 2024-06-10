import { User } from "../models/user.js";

const newUser = async (req, res) => {
  const avatar = {
    public_id: "abjk",
    url: "akln",
  };

  await User.create({
    name: "Loki",
    username: "loki",
    password: "loki",
    avatar,
  });

  res.status(201).json({ message: "User created successfully" });
};

const login = (req, res) => {
  res.send("Hello frontend");
};

export { login, newUser };
