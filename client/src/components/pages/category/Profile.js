import React from "react";
import styled from "styled-components";

const ProfileBox = styled.div`
  position: relative;

  width: 500px;
  height: 300px;
  margin: 0px 10px 90px 10px;
  cursor: pointer;

  .profile {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    bottom: -50px;
    background-color: #ffffff;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.05);
    .profileImgBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 75px;
      height: 75px;
      margin: 0px 0px 20px 10px;
      background-color: rgb(255, 255, 255);
      border-radius: 15px;
      box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.05);
      .profileImg {
        width: 65px;
        height: 65px;
        border-radius: 10px;
      }
    }
    .profileName {
      display: inline-block;
      width: 105px;
      margin: 0px 10px 10px 15px;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .profileBg {
    width: 100%;
    height: 100%;
    border-radius: 10px 10px 0px 0px;
  }
`;

const Profile = ({ src }) => {
  return (
    <ProfileBox>
      <div className="profile">
        <div className="profileImgBox">
          <img className="profileImg" src={src} alt="프로필 이미지" />
        </div>
        <div className="profileName">{"name"}</div>
      </div>
      <img className="profileBg" src={src} alt="프로필 배경 이미지" />
    </ProfileBox>
  );
};

export default Profile;
