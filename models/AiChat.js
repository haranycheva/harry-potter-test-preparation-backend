import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const messageSchema = new Schema(
  {
    role: {
      type: String,
      enum: [, "assistant", "user"],
      required: true,
    },
    content: {
      type: String,
      required: [true, "the message text is required"],
    },
  },
  { timestamps: true, versionKey: false }
);

const messageForAiSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["system", "assistant", "user"],
      required: true,
    },
    content: {
      type: String,
      required: [true, "the message text is required"],
    },
  },
  { _id: false, versionKey: false }
);

const aiChatSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    messages: [messageSchema],
    messagesForAi: [messageForAiSchema],
  },
  { versionKey: false }
);
aiChatSchema.post("save", handleSaveError);
aiChatSchema.pre("findOneAndUpdate", preUpdate);
aiChatSchema.post("findOneAndUpdate", handleSaveError);

export const AiChat = model("aichat", aiChatSchema);
