import { Buffer } from 'buffer';

export const getTokenFromLocal = () => {
  return window.localStorage.getItem('token-wedding');
};

const getPayload = () => {
  const token = getTokenFromLocal();
  if (!token) return;
  const splitToken = token.split('.');
  if (splitToken.length < 3) return;
  return JSON.parse(Buffer.from(splitToken[1], 'base64') as unknown as string);
};

export const userAuth = () => {
  const payload = getPayload();
  if (!payload) return false;
  const currentTime = Math.round(Date.now() / 1000);
  return currentTime < payload.exp;
};
