export function comparison(input, secret) {
  let commonCount = 0;
  const inputCharCount = {};
  const secretCharCount = {};

  for (let char of input) {
    inputCharCount[char] = (inputCharCount[char] || 0) + 1;
  }

  for (let char of secret) {
    secretCharCount[char] = (secretCharCount[char] || 0) + 1;
  }

  for (let char in inputCharCount) {
    if (secretCharCount[char]) {
      commonCount += Math.min(inputCharCount[char], secretCharCount[char]);
    }
  }

  return commonCount;
}