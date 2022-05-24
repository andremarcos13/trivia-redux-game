export const TOKEN_SAVER = 'TOKEN_SAVER';
export const globalExpensesUpdate = (token) => ({
  type: TOKEN_SAVER,
  payload: token,
});

export const loginAction = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
    dispatch(globalExpensesUpdate(result.token));
  } catch (error) {
    console.log(error);
  }
};
