import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const optionSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "option answer is required"],
      },
      isCorrect: {
        type: Boolean,
        required: [true, "correctness of answer is required"],
      },
      task: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "task",
      },
    },
    { versionKey: false }
  );
  optionSchema.post("save", handleSaveError);
  optionSchema.pre("findOneAndUpdate", preUpdate);
  optionSchema.post("findOneAndUpdate", handleSaveError);
  
  export const Option = model("option", optionSchema);