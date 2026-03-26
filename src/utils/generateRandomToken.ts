function generateRandomToken() {
  const bytes = new Uint8Array(48);
  crypto.getRandomValues(bytes);

  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function createToken(): [string, number] {
  const newToken = generateRandomToken();
  const createdAt = Date.now();
  localStorage.setItem('cache_token', newToken);
  localStorage.setItem('cache_token_created', createdAt.toString());

  return [newToken, createdAt];
}
