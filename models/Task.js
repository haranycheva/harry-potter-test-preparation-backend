import { model, Schema } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks.js";
import mongoose from "mongoose";

const taskSchema = new Schema(
  {
    condition: {
      type: String,
      required: [true, "condition of task is required"],
    },
    conditionPicture: {
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
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          if (this.type === "options") {
            return typeof value === "number";
          } else if (this.type === "input" || this.type === "match") {
            return value === undefined;
          }
          return false;
        },
        message: (props) =>
          `field optionsQuant doesn't satisfy the task type "${props.instance.type}"`,
      },
    },
    questionsQuant: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          if (this.type === "match") {
            return typeof value === "number";
          } else if (this.type === "input" || this.type === "options") {
            return value === undefined;
          }
          return false;
        },
        message: (props) =>
          `field questionsQuant doesn't satisfy the task type "${props.instance.type}"`,
      },
    },
    oddAnswer: [String],
    isTest: {
      type: Boolean
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
