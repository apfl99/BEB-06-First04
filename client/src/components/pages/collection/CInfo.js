import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { textSkip } from "../../../libs/textSkip";

const CInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 97vw;
  margin-top: 35px;
  .cInfoHeader {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    .cName {
      font-size: 30px;
      font-weight: 500;
    }
    .cEtc {
      display: flex;
      div:first-child {
        position: relative;
        margin-right: 20px;
        ::after {
          content: "";
          position: absolute;
          right: -10px;
          height: 30px;
          padding-left: 0px;
          border-right: 1px solid rgba(60, 60, 60, 0.2);
        }
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.2s;
        :hover {
          box-shadow: 0px 1px 10px rgba(121, 121, 121, 0.3);
        }
        img {
          width: 20px;
        }
        i {
          font-size: 20px;
        }
      }
    }
  }

  .cInfoState {
    margin-top: 15px;
    color: var(--footer-text);
    .cState1 {
      display: flex;
      justify-content: space-between;
      width: 380px;
    }
    .cState2 {
      width: 620px;
      margin-top: 15px;
      .moreToggle {
        margin-top: ${(props) => (props.more ? "20px" : "0px")};
        cursor: pointer;
        :hover {
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .cState3 {
      display: flex;
      margin-top: 30px;
      .cIEtc {
        margin-right: 35px;
        div {
          display: flex;
          span {
            margin-left: 2px;
            color: black;
            font-size: 20px;
            font-weight: 500;
            line-height: 22px;
          }
        }
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const CInfo = ({ data }) => {
  const [more, setMore] = useState(false);
  const [descript, setDescript] = useState();
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  let year = data.created_date.slice(0, 4);
  let month = months[data.created_date.slice(5, 7)];
  let creatorFee = data.fees.seller_fees[data.payout_address];

  //   console.log(data);

  useEffect(() => {
    if (data.description) {
      textSkip(more, data.description, 77, setDescript);
    }
  }, [more]);

  return (
    <CInfoBox>
      <div className="cInfoHeader">
        <div className="cName">{data.name}</div>
        <div className="cEtc">
          <div>
            <img src="/images/logo/etherscan-logo.png" alt="" />
          </div>
          <div>
            <i className="fa fa-star-o" />
            {/* <i className="fa fa-star" /> */}
          </div>
          <div>
            <i className="fa fa-share-alt" />
          </div>
          <div>
            <i className="fa fa-ellipsis-h" />
          </div>
        </div>
      </div>

      <div className="cInfoState">
        <div className="cState1">
          <div className="count">
            Items <b>{data.stats.count}</b>
          </div>
          ·
          <div className="created">
            Created
            <b>
              {} {month} {year}
            </b>
          </div>
          ·
          <div className="createdFee">
            Creator fee
            <b> {creatorFee ? creatorFee / 100 : 0}%</b>
          </div>
        </div>

        {descript ? (
          <div className="cState2">
            <div className="descript">{descript}</div>
            {descript.length >= 77 ? (
              <div
                className="moreToggle"
                onClick={() => {
                  setMore(!more);
                }}
              >
                {more ? "See less" : "See more"}
                {more ? (
                  <i className="fa fa-chevron-up" />
                ) : (
                  <i className="fa fa-chevron-down" />
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="cState3">
          <div className="cIEtc">
            <div>
              <img src="/images/logo/ethereum-logo.png" alt="" />
              <span>{data.stats.total_volume}</span>
            </div>
            <div>total volume</div>
          </div>
          <div className="cIEtc">
            <div>
              <img src="/images/logo/ethereum-logo.png" alt="" />
              <span>{data.stats.floor_price}</span>
            </div>
            floor price
          </div>
          <div className="cIEtc">
            <div>
              {/* <img src="/images/logo/ethereum-logo.png" alt="" /> */}
              <span>{"---"}</span>
            </div>
            best offer
          </div>
          <div className="cIEtc">
            <div>
              <span>{"?"}%</span>
            </div>
            listed
          </div>
          <div className="cIEtc">
            <div>
              <span>{data.stats.num_owners}</span>
            </div>
            owners
          </div>
          <div className="cIEtc">
            <div>
              <span>
                {Math.floor((data.stats.num_owners / data.stats.count) * 100)}%
              </span>
            </div>
            unique owners
          </div>
        </div>
      </div>
    </CInfoBox>
  );
};

export default CInfo;
