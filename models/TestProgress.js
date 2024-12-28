import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const testProgressSchema = new Schema(
  {
    aviable: {
      type: Boolean,
      required: [true, "aviability of topic is required"],
    },
    score: {
      type: Number,
      required: [true, "score quantity is required"]
    },
    test: {
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
testProgressSchema.post("save", handleSaveError);
testProgressSchema.pre("findOneAndUpdate", preUpdate);
testProgressSchema.post("findOneAndUpdate", handleSaveError);

export const TestProgress = model("test-prog", testProgressSchema);
