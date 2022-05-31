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
