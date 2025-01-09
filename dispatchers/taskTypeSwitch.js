

const taskTypeSwitch = async (task, forInput, forOptions, forMatch) => {
  const type = task.type;
  switch (type) {
    case "input":
      return  await forInput(task);
    case "options":
      return await forOptions(task);
    case "match":
      return await forMatch(task);
    default:
      return
  }
};

export default taskTypeSwitch