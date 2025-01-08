import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const taskProgressSchema = new Schema(
  {
    score: {
      type: Number,
      required: [true, "score quantity is required"]
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
