import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CNftListBox = styled.div`
  width: 70%;
  .noneBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100px;
    margin: auto;
    font-size: 26px;
    font-weight: 600;
    border-radius: 15px;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  }

  .nftBox {
    //width: 70%;
    .nftHeader {
      display: flex;
      justify-content: space-between;
      margin: 20px 5px 10px 5px;
      .refresh {
        display: flex;
        justify-content: space-between;
        width: 100px;
        color: rgba(22, 22, 22, 0.8);
        i {
          margin-left: 10px;
        }
      }
    }
    .nftList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .cNftBox {
        position: relative;
        ${(props) => (props.nftSize === "large" ? "width: 45%" : null)};
        ${(props) => (props.nftSize === "middle" ? "width: 30%" : null)};
        ${(props) => (props.nftSize === "small" ? "width: 45%" : null)};
        //width: 45%;
        ${(props) =>
          props.nftSize === "small" ? "height: 200px" : "height: 400px"};
        /* height: 400px; */
        margin: 10px 5px 0px 10px;
        cursor: pointer;
        transition: 0.2s;
        a {
          color: black;
        }
        //background-color: rgb(58, 58, 58);
        .cNftInfo {
          display: ${(props) => (props.nftSize === "small" ? "none" : "block")};

          position: absolute;

          bottom: 0px;
          width: 100%;
          height: 125px;
          background-color: white;
          padding: 0px 5px;
          border-radius: 0px 0px 15px 15px;
          box-shadow: 0px 1px 5px rgba(58, 58, 58, 0.1);
          .cName {
            margin: 10px 0px;
            font-weight: 500;
          }
          .saleInfo {
            .salePriceText {
              margin-left: 5px;
              font-size: 12px;
              font-weight: 500;
            }
            .salePrice {
              display: flex;
              img {
                width: 20px;
                height: 20px;
              }
              div {
                margin-left: 5px;
                line-height: 21px;
                font-weight: 500;
              }
            }
            .saleLastSale {
              margin-top: 10px;
              margin-left: 5px;
              font-size: 12px;
              font-weight: 500;
            }
          }
        }
        .cNftImgBox {
          display: flex;
          width: 100%;
          height: ${(props) => (props.nftSize === "small" ? "150px" : "300px")};
          transition: 0.2s;
          .nftImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: ${(props) =>
              props.nftSize === "small" ? "15px" : "15px 15px 0px 0px"};
            transition: 0.5s;
            overflow: hidden;

            :hover {
              //transform: translate(-5%, -5%);
              width: ${(props) =>
                props.nftSize === "small" ? "100%" : "110%"};
              height: ${(props) =>
                props.nftSize === "small" ? "100%" : "110%"};
            }
          }
        }
      }
    }
  }
`;

const CNftList = ({ data, nftSize }) => {
  const [nftData, setNftData] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (data.primary_asset_contracts[0]) {
      axios
        .get(
          `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${data.primary_asset_contracts[0].address}&offset=0&limit=10&include_orders=false`
        )
        .then((res) => {
          if (res.data.assets.length > 0) {
            setNftData(res.data.assets);
          } else {
            setCheck(true);
          }
        });
    } else {
      setCheck(true);
    }
  }, []);

  return (
    <CNftListBox nftSize={nftSize}>
      {nftData.length > 0 ? (
        <div className="nftBox">
          <div className="nftHeader">
            <div className="refresh">
              <div>
                <i className="fa fa-refresh" />
              </div>
              <div>refresh</div>
            </div>
            <div>{nftData.length} items</div>
          </div>
          <div className="nftList">
            {nftData.map((asset, index) => (
              <div className="cNftBox" key={index}>
                <Link
                  to={`/assets/${asset.asset_contract.address}/${asset.token_id}`}
                >
                  <div className="cNftInfo">
                    <div className="cName">
                      {asset.name ? asset.name : index}
                    </div>
                    <div className="saleInfo">
                      <div className="salePriceText">Price</div>
                      <div className="salePrice">
                        {/* 가격 데이터 바인딩 안됨 */}
                        <img src="/images/logo/ethereum-logo.png" alt="" />
                        <div>?</div>
                      </div>
                      <div className="saleLastSale">
                        Last sale:
                        {asset.last_sale
                          ? asset.last_sale.payment_token.eth_price
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="cNftImgBox">
                    <img src={asset.image_url} alt="" className="nftImg" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="noneBox">
          {check ? "NFT 없음!" : "NFT 불러오는 중!"}
        </div>
      )}
    </CNftListBox>
  );
};

export default CNftList;
