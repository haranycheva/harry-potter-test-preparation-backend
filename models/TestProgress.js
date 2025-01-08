import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const testProgressSchema = new Schema(
  {
    maxScore: {
      type: Number,
      required: [true, "score quantity is required"]
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
testProgressSchema.post("save", handleSaveError);
testProgressSchema.pre("findOneAndUpdate", preUpdate);
testProgressSchema.post("findOneAndUpdate", handleSaveError);

export const TestProgress = model("test-prog", testProgressSchema);
