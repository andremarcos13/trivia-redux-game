export const QUESTION_SAVER = 'QUESTION_SAVER';
export const SAVE_SCORE = 'SAVE_SCORE';
export const questionsSaver = (payload) => ({
  type: QUESTION_SAVER,
  payload,
});

export const saveStats = (playerScore, assertions) => ({
  type: SAVE_SCORE,
  playerScore,
  assertions,
});

export const fetchAPI = (token) => async (dispatch) => {
  try {
    // const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${ category }&difficulty=${ difficulty }&token=${ token }`);
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const result = await response.json();
    dispatch(questionsSaver(result)); // << ERRO AQUI
  } catch (error) {
    console.log(error);
  }
};
