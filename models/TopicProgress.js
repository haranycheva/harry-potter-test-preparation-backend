import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const topicProgressSchema = new Schema(
  {
    completedTasks: {
      type: Number,
      default: 0,
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
