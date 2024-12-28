import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const topicProgressSchema = new Schema(
  {
    aviable: {
      type: Boolean,
      required: [true, "aviability of topic is required"],
    },
    completedTasks: {
      type: Number,
      required: [true, "completed tasks quantity is required"]
    },
    topic: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "topic",
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
  },
  { versionKey: false }
);
topicProgressSchema.post("save", handleSaveError);
topicProgressSchema.pre("findOneAndUpdate", preUpdate);
topicProgressSchema.post("findOneAndUpdate", handleSaveError);

export const TopicProgress = model("topic-prog", topicProgressSchema);
