import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const taskProgressSchema = new Schema(
  {
    maxScore: {
      type: Number,
      required: [true, "score quantity is required"]
    },
    wasCompleted: {
      type: Boolean,
      default: false
    },
    task: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "test",
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
  },
  { versionKey: false }
);
taskProgressSchema.post("save", handleSaveError);
taskProgressSchema.pre("findOneAndUpdate", preUpdate);
taskProgressSchema.post("findOneAndUpdate", handleSaveError);

export const TaskProgress = model("task-prog", taskProgressSchema);
