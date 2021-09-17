// "token-value"를 {token: "value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
  const cookies: { [key: string]: string } = {};
  if (cookieString) {
    // "token=value"
    const itemString = cookieString?.split(/\s*;\s*/);
    itemString.forEach((pairs) => {
      // ["token", "value"]
      const pair = pairs.split(/\s*=\s*/);
      cookies[pair[0]] = pair.splice(1).join('=');
    });
  }
  return cookies;
};

// string에서 number만 return하는 함수
export const getNumber = (string: string) => {
  // match - 문자열이 정규식과 매치되는 부분을 검색
  // join - 배열의 모든 요소를 연결해 하나의 문자열로 만듬
  const numbers = string.match(/\d/g)?.join('');
  if (numbers) {
    return Number(numbers);
  }
  return null;
};
