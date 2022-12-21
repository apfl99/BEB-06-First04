import React from "react";
import styled from "styled-components";

const NftInfoBox = styled.div`
  width: 680px;
  .infoHeader {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cinfo {
      display: flex;
      justify-content: space-between;
      .cHName {
        margin-top: 10px;
      }
      .iconBox {
        display: flex;
        width: auto;

        div:first-child {
          border-radius: 10px 0px 0px 10px;
        }
        div:last-child {
          border-radius: 0px 10px 10px 0px;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 45px;
          height: 45px;
          border: 1px solid var(--footer-border-bottom);
          background-color: white;
          transition: box-shadow 0.2s;
          :hover {
            box-shadow: 0px 1px 10px var(--shadow);
          }
        }
      }
    }
    .cName {
      font-size: 30px;
      font-weight: 600;
    }
    .addInfos {
      display: flex;
      margin-top: 30px;
      font-size: 14px;
      color: var(--footer-text);
      .ownerName {
        margin-right: 15px;
      }
      .viewNum {
        display: flex;
        div {
          margin-left: 10px;
        }
      }
    }
  }
  .infoBody {
    border: 1px solid var(--footer-border-bottom);
    border-radius: 15px;
    .saleInfo {
      .timeInfo {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--footer-border-bottom);
        div {
          margin-left: 5px;
        }
      }
      .buyBox {
        padding: 15px;
        background-color: rgba(225, 241, 255, 0.2);
        .buyText {
          color: var(--footer-text);
        }
        .buyPrice {
          display: flex;
          margin-top: 10px;
          img {
            width: 25px;
            height: 25px;
          }
          .buyEthe {
            margin-left: 5px;
            font-size: 24px;
            font-weight: 600;
            line-height: 25px;
          }
          .buyChangeEthe {
            margin-left: 10px;
          }
        }
        .buyButtons {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          //background-color: #ffdfdf;
          button {
            width: 49%;
            height: 60px;
            border-radius: 15px;
            background-color: white;
            font-size: 18px;
            font-weight: 500;
            transition: 0.2s;
          }
          .cartB {
            border: 0px;
            background-color: rgba(0, 132, 255);
            color: white;
            :hover {
              background-color: rgba(0, 132, 255, 0.8);
            }
          }
          .offerB {
            border: 2px solid var(--footer-border-bottom);
            color: #0084ff;
            :hover {
              box-shadow: 0px 1px 10px var(--shadow);
            }
            i {
              margin-right: 7px;
            }
          }
        }
      }
    }
  }
`;

const NftInfo = () => {
  return (
    <NftInfoBox>
      <div className="infoHeader">
        <div className="cinfo">
          <div className="cHName">{"name"}</div>
          <div className="iconBox">
            <div>
              <i className="fa fa-repeat" />
            </div>
            <div>
              <i className="fa fa-share-square-o" />
            </div>
            <div>
              <i className="fa fa-link" />
            </div>
            <div>
              <i className="fa fa-ellipsis-v" />
            </div>
          </div>
        </div>

        <div className="cName">{"name"}</div>
        <div className="addInfos">
          <div className="ownerName">
            Ownerd by <a href="/">{"Name"}</a>
          </div>
          <div className="viewNum">
            <div>
              <i className="fa fa-eye" />
            </div>
            <div>{17} views</div>
          </div>
        </div>
      </div>

      <div className="infoBody">
        <div className="saleInfo">
          <div className="timeInfo">
            <div>
              <i className="fa fa-clock-o" />
            </div>
            <div>Sale ends November 6, 2022 at 8:57am GMT+9</div>
          </div>
          <div className="buyBox">
            <div className="buyText">Current price</div>
            <div className="buyPrice">
              <div>
                <img src="images/logo/ethereum-logo.png" alt="ethe-logo" />
              </div>
              <div className="buyEthe">20</div>
              <div className="buyChangeEthe">$5656</div>
            </div>
            <div className="buyButtons">
              <button className="cartB">Add to cart</button>
              <button className="offerB">
                <i className="fa fa-tag" /> Make offer
              </button>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </NftInfoBox>
  );
};

export default NftInfo;
