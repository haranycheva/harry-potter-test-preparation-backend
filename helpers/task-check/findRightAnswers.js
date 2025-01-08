import bcrypt from "bcryptjs";

const findRightAnswers = async (userAnswer) => {
  const result = { score: 0, answers: [] };

  for (const item of userAnswer) {
    const { condition, answer } = item;

    if (await bcrypt.compare(condition, answer)) {
      result.answers.push({ condition, answer, isCorrect: true });
      result.score += 1;
    } else {
      result.answers.push({ condition, answer, isCorrect: false });
    }
  }

  return result;
}

export default findRightAnswers