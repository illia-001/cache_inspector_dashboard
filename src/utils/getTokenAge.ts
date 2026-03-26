export function getTokenAge(createdAt: number | null) {
  const age = createdAt ? Date.now() - createdAt : 0;

  return age === 0 ? 0 : Math.floor(age / 1000);
}
