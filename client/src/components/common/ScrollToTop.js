import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 공용 컴포넌트로 사용하기 위해 디자인 추가 예정
export default function ScrollToTop() {
  // pathname 주석처리 X
  // useEffect 발동 조건으로 놔두었음
  const { pathname } = useLocation();

  // 의존성을 제거해서 같은 페이지에도 작동하게 함
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return null;
}
