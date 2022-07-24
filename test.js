let questionKey = {
  "Q-1": ["a-1", false],
  "Q-2": ["a-2", false],
  "Q-3": ["a-3", false],
  "Q-4": ["a-4", false],
  "Q-5": ["a-5", false],
  "Q-6": ["a-6", false],
  "Q-7": ["a-7", false],
  "Q-8": ["a-8", false],
  "Q-9": ["a-9", false],
  "Q-10": ["a-10", false],
};
let questions = Object.keys(questionKey);

for (const key in questionKey) {
    const element = questionKey[key];
    console.log(element)
}