function randomScore() {
  return Math.floor(Math.random() * 10 + 1);
}

function randomRecommendation(array) {
  const index = Math.floor(Math.random() * (array.length));
  return array[index];
}

export {
  randomScore,
  randomRecommendation,
};
