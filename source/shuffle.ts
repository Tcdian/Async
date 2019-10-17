import _swap from './_swap';

function shuffle<T extends any[]>(array: T): T {
  const length = array.length;
  const shuffled = [...array] as T;
  for(let i = 0; i < length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * (length - i)) + i;
    _swap(shuffled, i, randomIndex);
  }
  return shuffled;
}

export default shuffle;
