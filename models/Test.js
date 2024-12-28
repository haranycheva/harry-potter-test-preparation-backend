import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";

const testSchema = new Schema(
    {
        possibleScore: {
          type: Number,
          required: [true, "possible score is required"]
        },
        topic: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "topic",
        },
  },
  { versionKey: false }
);
testSchema.post("save", handleSaveError);
testSchema.pre("findOneAndUpdate", preUpdate);
testSchema.post("findOneAndUpdate", handleSaveError);

export const Test = model("test", testSchema);
