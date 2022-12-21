import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryListBox = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  width: 880px;
  margin-top: 40px;
  //background-color: gray;
  .themeHeader {
    font-size: 28px;
    font-weight: 600;
    padding-bottom: 25px;
  }
  .themeList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    a {
      color: black;
    }
    .themeBox {
      position: relative;
      display: inline-block;
      width: 280px;
      margin-bottom: 25px;
      padding-bottom: 45px;
      cursor: pointer;
      .themeName {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0px;
        width: 100%;
        height: 50px;
        background-color: white;
        font-size: 20px;
        font-weight: 700;
        box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.096);
        border-radius: 0px 0px 20px 20px;
      }
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 20px 20px 0px 0px;
      }
    }
  }
`;

const CategoryList = () => {
  // test theme image data
  let themes = [
    ["/images/main/t1.png", "Art"],
    ["/images/main/t2.png", "Collectibles"],
    ["/images/main/t3.png", "Domain Names"],
    ["/images/main/t4.png", "Music"],
    ["/images/main/t5.png", "Photography"],
    ["/images/main/t6.png", "Sports"],
    ["/images/main/t7.png", "Trading Cards"],
    ["/images/main/t8.png", "Utility"],
    ["/images/main/t9.png", "Virtual Worlds"],
  ];
  return (
    <CategoryListBox>
      <div className="themeHeader">Browse by category</div>
      <div className="themeList">
        {themes.map((theme, index) => (
          <Link to={`/category/${theme[1]}`} key={`theme-${theme[1]}`}>
            <div className="themeBox">
              <div className="themeName">{theme[1]}</div>
              <img src={theme[0]} alt={`theme-${theme[1]}`} />
            </div>
          </Link>
        ))}
      </div>
    </CategoryListBox>
  );
};

export default CategoryList;
