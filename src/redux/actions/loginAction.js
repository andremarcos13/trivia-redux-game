export const TOKEN_SAVER = 'TOKEN_SAVER';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const tokenSaver = (token) => ({
  type: TOKEN_SAVER,
  returnToken: token,
});

export const gravatarAct = (name, email) => ({
  type: SAVE_EMAIL,
  profileName: name,
  email,
});
