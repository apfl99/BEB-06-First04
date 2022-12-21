import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SliderBox = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sliderText {
    margin-bottom: 40px;
    text-align: center;
    font-size: 34px;
    font-weight: bold;
  }

  .sliderImg {
    position: relative;
    width: 900px; // imgBox-width + margin(L + R)
    overflow: hidden;
    .fa {
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #80808078;
      color: white;
      border-radius: 50%;
      text-align: center;
      z-index: 15;
    }
    .fa-angle-right {
      right: 0px;
      padding-left: 5px;
    }
    .fa-angle-left {
      padding-right: 5px;
    }

    .imgBoxs {
      //position: relative;
      display: flex;
      transition: 0.3s;

      // 이동
      transform: translateX(0px); //width + margin(L + R) -300
      .imgBox {
        position: relative;
        display: inline-block;
        max-width: 500px;
        min-width: 280px; // 30vw
        max-height: 500px;
        min-height: 280px;
        width: 280px; //280px
        height: 280px;
        overflow: hidden;
        border-radius: 18px;
        margin: 0px 10px;

        cursor: pointer;
        :hover {
          img {
            transform: translate(-5%, -5%);
            width: 110%;
            height: 110%;
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-size: cover;
          transition: 0.5s;
        }
        .imgBg {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 100px;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(20, 20, 20, 0.712)
          );
          color: white;
          z-index: 10;
          .imgText {
            position: absolute;
            bottom: 0px;
            padding: 10px;
          }
        }
      }
    }
  }
`;

const Slider = ({ data }) => {
  const [sliderPos, setSliderPos] = useState(0);
  return (
    <SliderBox>
      <div className="sliderText">Explore, collect, and sell NFTs</div>
      <div className="sliderImg">
        {sliderPos !== 0 ? (
          <i
            className="fa fa-angle-left fa-3x"
            onClick={(e) => {
              setSliderPos(sliderPos + 300);
            }}
          />
        ) : null}
        {sliderPos > -600 ? (
          <i
            className="fa fa-angle-right fa-3x"
            onClick={(e) => {
              setSliderPos(sliderPos - 300);
            }}
          />
        ) : null}

        <div
          className="imgBoxs"
          style={{ transform: `translateX(${sliderPos}px)` }}
        >
          {data.length > 0
            ? data.map(({ image_url, name, stats, slug }, index) => (
                <Link
                  key={`nftBox-${index}`}
                  to={`/collection/${slug}`}
                  state={data[index]}
                >
                  <div className="imgBox" key={`imgBox-${index}`}>
                    <div className="imgBg">
                      <div className="imgText">
                        <h4>{name}</h4>
                        <span style={{ fontWeight: "500" }}>
                          Floor: {stats.floor_price}
                        </span>
                      </div>
                    </div>
                    <img src={image_url} alt={`NFT-Img-${index}`} />
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
    </SliderBox>
  );
};

export default Slider;
