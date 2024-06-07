import { Schema, Types, model, models } from "mongoose";

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
    content: String,
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", schema);
