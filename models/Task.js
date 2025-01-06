import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import mongoose from "mongoose";

const taskSchema = new Schema(
  {
    condition: {
      type: String,
      required: [true, "condition of task is required"],
    },
    captionPicture: {
      type: String,
    },
    caption: {
      type: String,
    },
    possibleScore: {
      type: Number,
      min: 1,
      required: [true, "possible score is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
      enum: ["input", "match", "options"],
    },
    answer: {
      type: String,
    },
    optionsQuant: {
      type: Number,
    },
    questionsQuant: {
      type: Number,
    },
    oddAnswers: {
      type: [String],
      default: undefined
    },
    isTest: {
      type: Boolean,
    },
    questionCaption: {
      type: String,
    },
    answersCaption: {
      type: String,
    },
    topic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "topic",
    },
  },
  { versionKey: false }
);
taskSchema.post("save", handleSaveError);
taskSchema.pre("findOneAndUpdate", preUpdate);
taskSchema.post("findOneAndUpdate", handleSaveError);

export const Task = model("task", taskSchema);
