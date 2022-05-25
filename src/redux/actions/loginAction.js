import md5 from 'crypto-js/md5';

export const TOKEN_SAVER = 'TOKEN_SAVER';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const tokenSaver = (token) => ({
  type: TOKEN_SAVER,
  payload: token.token,
  returnToken: token,
});

export const gravatarAct = (resultado, name) => ({
  type: SAVE_EMAIL,
  gravatar: resultado,
  profileName: name,
});

export const loginAction = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await response.json();
    localStorage.setItem('token', result.token);
    dispatch(tokenSaver(result));
  } catch (error) {
    console.log(error);
  }
};

export const gravatarThunk = (email, name) => async (dispatch) => {
  try {
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const promise = await fetch(url);
    const result = promise.url;
    dispatch(gravatarAct(result, name));
  } catch (error) {
    return error;
  }
};
