import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NftListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 880px;
  margin-top: 50px;
  .listTaps {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgba(22, 22, 22, 0.08);
    color: rgba(22, 22, 22, 0.482);
    .toggleTap {
      display: flex;
      font-size: 28px;
      font-weight: 600;

      .trending {
        transition: color 0.5s;
        margin-right: 40px;
        padding-bottom: 12px;
        cursor: pointer;
        border-bottom: 2px solid rgba(22, 22, 22, 0.8); // 이벤트 걸기
        color: #161616; // 이벤트 걸기
        :hover {
          color: #161616;
        }
      }
      .top {
        transition: color 0.5s;
        cursor: pointer;
        :hover {
          color: #161616;
        }
      }
    }
    .settingTap {
      display: flex;
      margin-bottom: 5px;
      .time {
        border: 2px solid rgba(22, 22, 22, 0.08);
        border-radius: 12px;
        color: rgba(22, 22, 22, 0.623);
        background-color: white;
        font-size: 16px;
        font-weight: 700;
        padding: 6px 25px;
        i {
          margin-left: 10px;
          color: rgba(22, 22, 22, 0.342);
        }
      }
      .view {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        margin-left: 15px;
        padding: 6px 15px;
        border: 2px solid rgba(22, 22, 22, 0.18);
        border-radius: 12px;
        font-size: 16px;
        font-weight: 700;
        color: #161616;
        background-color: white;
        cursor: pointer;
      }
    }
  }
  .nftLists {
    display: flex;
    flex-direction: column;
    margin: 20px 5px 0px 5px;

    .listHeader {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: bold;
      color: rgba(22, 22, 22, 0.482);
    }
    .nftList {
      margin-top: 10px;
      font-size: 20px;
      a {
        color: black;
      }
      .nftBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        transition: 0.5s;
        cursor: pointer;
        :hover {
          background-color: rgba(128, 128, 128, 0.1);
        }
        .nftNum {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 10px;
          margin-right: 20px;
          font-size: 24px;
          font-weight: 500;
          color: rgba(22, 22, 22, 0.482);
        }
        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 10px;
          margin-right: 20px;
        }
        .nftInfo {
          padding-top: 5px;
          flex-grow: 3;
          .name {
            font-weight: 000;
          }
          .floor {
            padding-left: 7px;
            font-size: 16px;
            color: rgba(22, 22, 22, 0.482);
          }
        }
      }
    }
  }
`;

const NftList = ({ data }) => {
  return (
    <NftListBox>
      <div className="nftListBox">
        <div className="listTaps">
          <div className="toggleTap">
            <div className="trending">Trending</div>
            <div className="top">Top</div>
          </div>
          <div className="settingTap">
            <button className="time">
              24h
              <i className="fa fa-chevron-down" />
            </button>
            <button className="view">View all</button>
          </div>
        </div>

        <div className="nftLists">
          <div className="listHeader">
            <div>COLLECTION</div>
            <div>VOLUME</div>
          </div>

          <div className="nftList">
            {data
              ? data.map(({ image_url, name, slug, stats }, index) => (
                  <Link
                    key={`nftBox-${index}`}
                    to={`/collection/${slug}`}
                    state={data[index]}
                  >
                    <div className="nftBox">
                      <div className="nftNum">{index + 1}</div>
                      <img src={image_url} alt={`nft-${index}`} />
                      <div className="nftInfo">
                        <div className="name">{name}</div>
                        <div className="floor">Floor: {stats.floor_price}</div>
                      </div>
                      <div className="ether">{stats.one_day_volume} ETH</div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </NftListBox>
  );
};

export default NftList;
