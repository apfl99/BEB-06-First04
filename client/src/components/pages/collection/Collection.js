import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CBody from "./CBody";
import CInfo from "./CInfo";

const CollectionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;

  .collectionImgBox {
    position: relative;
    width: 100vw;
    .cBGI {
      width: 100%;
      height: 250px;
      background-color: rgb(205, 205, 255);
      .i1 {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .cProfileImg {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 20px;
      bottom: -20px;
      width: 170px;
      height: 170px;
      background-color: ghostwhite;
      border-radius: 15px;
      .i2 {
        width: 93%;
        height: 93%;
        background-color: #1f1f96;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }
`;

const Collection = () => {
  const location = useLocation();

  return (
    <CollectionBox>
      <div className="collectionImgBox">
        <div className="cBGI">
          <img
            src={`${location.state.banner_image_url}`}
            alt=""
            className="i1"
          />
        </div>
        <div className="cProfileImg">
          <img src={`${location.state.image_url}`} alt="" className="i2" />
        </div>
      </div>
      <CInfo data={location.state} />
      <CBody data={location.state} />
    </CollectionBox>
  );
};

export default Collection;
