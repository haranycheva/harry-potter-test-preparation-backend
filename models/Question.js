import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const questionSchema = new Schema(
  {
    condition: {
      type: String,
      required: [true, "condition of question is required"],
    },
    answer: {
      type: String,
      required: [true, "answer of question is required"],
    },
    task: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "task",
    },
  },
  { versionKey: false }
);
questionSchema.post("save", handleSaveError);
questionSchema.pre("findOneAndUpdate", preUpdate);
questionSchema.post("findOneAndUpdate", handleSaveError);

export const Question = model("question", questionSchema);
