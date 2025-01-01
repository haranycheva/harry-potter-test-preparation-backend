import { ctrlWrapper } from "../decorators/index.js";
import {
  getAllTopics,
  getTaskById,
  getTestTasks,
  getTopicById,
  getTopicTasksInformation,
} from "./digest-data/index.js";

export default {
  getAllTopics: ctrlWrapper(getAllTopics),
  getTopicById: ctrlWrapper(getTopicById),
  getTaskById: ctrlWrapper(getTaskById),
  getTestTasks: ctrlWrapper(getTestTasks),
  getTopicTasksInformation: ctrlWrapper(getTopicTasksInformation),
};
