const hashCode = (string: string) : number => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = (hash << 5) - hash + string.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export default hashCode;
