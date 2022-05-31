export const QUESTION_SAVER = 'QUESTION_SAVER';
export const questionsSaver = (payload) => ({
  type: QUESTION_SAVER,
  payload,
});

export const fetchAPI = (token) => async (dispatch) => {
  console.log('Start da fetchAPI na Action');
  try {
    // const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${ category }&difficulty=${ difficulty }&token=${ token }`);
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log('Resposta da API', result);
    dispatch(questionsSaver(result)); // << ERRO AQUI
  } catch (error) {
    console.log(error);
  }
};
