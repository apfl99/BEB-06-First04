import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Collections from "./Collections";
import Intro from "./Intro";

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;

  .topImg {
    width: 100%;
    height: 265px;
    margin-top: 70px;
    object-fit: cover;
  }
  .body {
    margin: 25px 20px 0px 20px;
  }
`;

const Category = () => {
  const { theme } = useParams();
  return (
    <CategoryBox>
      {/* 맨 위 배경 */}
      <img
        className="topImg"
        src={`/images/main/c${theme}.png`}
        alt="top 배경"
      />

      <div className="body">
        {/* 인트로 부분 */}
        <Intro theme={theme} />

        {/* 거래 가능한 콜랙션들 부분 */}
        <Collections />
      </div>
    </CategoryBox>
  );
};

export default Category;
