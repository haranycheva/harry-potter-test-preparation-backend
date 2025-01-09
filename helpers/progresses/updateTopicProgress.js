import { Topic } from "../../models/Topic.js";
import { TopicProgress } from "../../models/TopicProgress.js";
import { User } from "../../models/User.js";
import { HttpError } from "../index.js";
import updateUserProgress from "./updateUserProgress.js";

const updateTopicProgress = async (topicId, userId, currentTopic) => {
  const topic = await Topic.findById(topicId)
  if(!topic){
    throw HttpError(404, `Can not find topic with id: ${topicId}`);
  }
  const topicProgress = await TopicProgress.findOne({
    owner: userId,
    topic: topicId,
  });
  if (!topicProgress) {
    const newTopicProgress = await TopicProgress.create({
      owner: userId,
      topic: topicId,
      completedTasks: 1,
    });
    if (!newTopicProgress) {
      throw HttpError(500, `Can not create topic progress`);
    }
    const progress = 1/topic.totalTasks
    const updatedUser = await User.findByIdAndUpdate(userId, {currentTopic: topic, progress})
    if (!updatedUser) {
      throw HttpError(500, `Can not update user's progress with id: ${userId}`);
    }
    return topicProgress;
  }
  const updatedTopicProgress = TopicProgress.findByIdAndUpdate(
    topicProgress._id,
    { completedTasks: topicProgress.completedTasks + 1 }
  );
  if(topicProgress.topic === currentTopic){
    updateUserProgress(userId, topicProgress.completedTasks / topic.totalTasks )
  }
  return updatedTopicProgress;
};

export default updateTopicProgress;
