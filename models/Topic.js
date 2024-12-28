import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name of topic is required"],
    },
    number: {
      type: Number,
      min: 1,
      required: [true, "tasks quantity is required"],
    },
    totalTasks: {
      type: Number,
      min: 0,
      required: [true, "tasks quantity is required"],
    },
  },
  { versionKey: false }
);
topicSchema.post("save", handleSaveError);
topicSchema.pre("findOneAndUpdate", preUpdate);
topicSchema.post("findOneAndUpdate", handleSaveError);

export const Topic = model("topic", topicSchema);
