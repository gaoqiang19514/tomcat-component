const TOKEN_NAME = 'token';

export function saveToken(token) {
  return localStorage.setItem(TOKEN_NAME, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function remoteToken() {
  localStorage.remoteItem(TOKEN_NAME);
}
