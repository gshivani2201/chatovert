import { compare } from "bcrypt";

import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "../middlewares/errors.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

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

const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("app-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  // finding all my chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  // All users from my chats includes friends and non friends
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // All users except me and friends
  const allUsersFromMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });

  const users = allUsersFromMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

const sendFriendRequest = TryCatch(async (req, res) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Request sent successfully",
  });
});

const acceptFriendRequest = TryCatch(async (req, res) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request not found", 404));

  if (request.receiver.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not authorized to accept this", 401));

  if (accept) {
    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name} - ${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Request acccepted successfully",
      senderId: request.sender._id,
    });
  } else {
    await request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  }
});

const getMyNotifications = TryCatch(async (req, res) => {
  const requests = await Request.find({
    receiver: req.user,
  }).populate("sender", "name avatar");

  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));

  return res.status(200).json({
    success: true,
    notifications: allRequests,
  });
});

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getMyNotifications,
};
