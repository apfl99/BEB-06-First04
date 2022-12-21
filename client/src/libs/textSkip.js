export const textSkip = (check, descript, limit, update) => {
  if (!check && descript.length >= limit) {
    update(descript.slice(0, limit) + "...");
  } else {
    update(descript);
  }
};

// check = boolean, 상태 값
// descript = string, 생략할 텍스트
// limit = number, 나타낼 최대 길이
// update = useState의 set 함수, 업데이트에 사용할 set 함수
