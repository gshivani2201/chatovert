import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

export const Request = mongoose.models.Request || model("Request", schema);
