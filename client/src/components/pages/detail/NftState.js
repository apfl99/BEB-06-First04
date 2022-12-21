import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const NftStateBox = styled.div`
  width: 550px;
  margin-right: 10px;
  .nftImgBox {
    width: 100%;
    border: 1px solid var(--footer-border-bottom);
    border-radius: 8px;
    .imgHeader {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      padding-bottom: 2px;
      border-bottom: 1px solid var(--footer-border-bottom);
      .iconBox {
        margin: 5px 0px 0px 8px;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .likeBox {
        display: flex;
        margin-right: 10px;
        color: rgba(128, 128, 128, 0.952);
        div {
          font-size: 14px;
          line-height: 27px;
        }
        .fa-heart-o {
          font-size: 16px;
          font-weight: bold;
          margin: 5px 0px 0px 11px;
          :hover {
            color: red;
          }
        }
      }
    }

    .imgBox {
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .nftDscBox {
    width: 100%;
    margin-top: 20px;
    border: 1px solid var(--footer-border-bottom);
    border-radius: 8px;
    //background-color: #fffedf;

    .h {
      padding: 20px;
      //background-color: #dd98985a;
      border-bottom: 1px solid var(--footer-border-bottom);
      font-weight: 600;
      i {
        margin-right: 15px;
      }
    }
    .b {
      padding: 15px;
      border-bottom: 1px solid var(--footer-border-bottom);
      background-color: rgba(240, 248, 255, 0.5);
    }
    .aH {
      position: relative;
      .ud {
        position: absolute;
        right: 10px;
        transform: translateY(3px);
        margin-left: 100px;
        color: #808080c3;
        cursor: pointer;
        :hover {
          color: black;
        }
      }
    }
    .nftDescription {
      display: flex;
      flex-direction: column;
      .descB {
        padding: 30px;
        .descB2 {
          font-weight: 650;
        }
        .descB3 {
          font-size: 14px;
          color: #535353ae;
        }
      }
    }
    .nftProperties {
      display: flex;
      flex-direction: column;
      .pList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .pData {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 140px;
          background-color: #c6e1ff30;
          border: 1px solid #48b6ffc6;
          border-radius: 8px;
          .pCa {
            margin-top: 8px;
            font-size: 10px;
            font-weight: 600;
            color: #48b6ffc6;
            
          }
          .pName {
            font-size: 13px;
            font-weight: 500;
          }
          .percent {
            margin-bottom: 8px;
            font-size: 13px;
            color: #535353ae;
          }
        }
      }
    }
    .nftAbout {
      /* 여기부터 시작 말풍선*/
      .aboutText {
        color: #616161eb;
        font-size: 14px;
        padding-top: ${(props) => (props.check.About ? "15px" : "0px")};
        padding-bottom: ${(props) => (props.check.About ? "15px" : "0px")};

        .iconBox {
          display: flex;
          padding-top: ${(props) => (props.check.About ? "35px" : "0px")};
          padding-bottom: ${(props) => (props.check.About ? "10px" : "0px")};

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
            width: 60px;
            height: 60px;
            border: 1px solid var(--footer-border-bottom);
            background-color: white;
            transition: box-shadow 0.2s;
            :hover {
              box-shadow: 0px 1px 10px var(--shadow);
            }
          }
        }
      }
    }
    .nftDetails {
      .detailsList {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin-top: 5px;
        color: var(--footer-text);
        .detailData {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          .dValue {
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
          }
        }
      }
    }
  }
`;

const NftState = (props) => {
  const [check, setCheck] = useState({
    Properties: false,
    About: false,
    Details: false,
  });
  const [myLink, setMyLink] = useState({
    etherscan: "s",
    twitter: "s",
    github: "s",
  });

  const params = useParams();
  const result = props.props.data
  
  const [owner, setOwner] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [traits, setTraits] = useState([])

  console.log('result'+result)
  
  const blockChain = "Goerli";
  const lastUpdated = "3 days ago";
  const creatorEarnings = "10%";

  const contractAddress = `${params.address}`;
  const contractAddressLink = `https://etherscan.io/search?f=0&q=${params.address}`;
  const tokenId = `${params.tokenId}`;

  useEffect(() => {
        if (!result){
        } else {
          let traits = []    
          for ( let i = 0; i < result.traits.length; i++){
            if (typeof result.traits[i].value !== 'number' ) {
              traits.push(result.traits[i])
            }
          }
        
        const image = result.image_url;
        const about = result.asset_contract.description;
        const description = result.description
        if (result.owner.user == null) {
          const owner = result.creator.address;
          setOwner(owner);
        } else {
          const owner = result.owner.user;
          setOwner(owner);
        } 
        if (result.owner.user == null) {
          if(result.creator.user.username==null){
            const owner = result.creator.address;
            setOwner(owner);
          } else{
            const owner = result.creator.user.username;
            setOwner(owner);
          }
        } else {
          const owner = result.owner.user.username;
          setOwner(owner);
        }
        
        setTraits(traits);
        setImage(image);
        setAbout(about);
        setDescription(description)
        }
  
     
  }, [params, result]);

  return (
    <NftStateBox check={check}>
      <div className="nftImgBox">
        <div className="imgHeader">
          <div className="iconBox">
            <img src="../../images/logo/ethereum-logo.png" alt="ethe-logo" />
          </div>
          <div className="likeBox">
            <div>0</div>
            <i className="fa fa-heart-o" />
          </div>
        </div>
        <div className="imgBox">
          <img src={image} alt="ethe-logo" />
        </div>
      </div>

      <div className="nftDscBox">
        <div className="nftDescription">
          <div className="descH h">
            <i className="fa fa-align-justify" />
            Description
          </div>
          <div className="descB b">By <span className="descB2">{owner}</span><p className="descB3">{description}</p></div>
          
        </div>

        <div className="nftProperties">
          <div className="aH h">
            <i className="fa fa-tag" />
            Properties
            {check.Properties ? (
              <i
                className="fa fa-chevron-up ud"
                onClick={() => setCheck({ ...check, Properties: false })}
              />
            ) : (
              <i
                className="fa fa-chevron-down ud"
                onClick={() => setCheck({ ...check, Properties: true })}
              />
            )}
          </div>
          {check.Properties ? (
            <div className="pList b">
              {traits.map((data, index) => (
                <div className="pData" key={`pList-${index}`}>
                  <div className="pCa">{data.trait_type}</div>
                  <div className="pName">{data.value}</div>
                  <div className="percent"></div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="nftAbout">
          <div className="aH h">
            <i className="fa fa-columns" />
            About
            {check.About ? (
              <i
                className="fa fa-chevron-up ud"
                onClick={() => setCheck({ ...check, About: false })}
              />
            ) : (
              <i
                className="fa fa-chevron-down ud"
                onClick={() => setCheck({ ...check, About: true })}
              />
            )}
          </div>

          {/*  여기부터 시작 */}
          {check.About ? (
            <div className="aboutText b">
              {about}
              <div className="iconBox">
                <div>
                  {myLink.etherscan ? (
                    <i className="fa fa-internet-explorer fa-2x" />
                  ) : null}
                </div>
                <div>
                  {myLink.twitter ? (
                    <i className="fa fa-twitter fa-2x" />
                  ) : null}
                </div>
                <div>
                  {myLink.github ? <i className="fa fa-github fa-2x" /> : null}
                </div>
                <div>
                  <i className="fa fa-ellipsis-v fa-2x" />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="nftDetails">
          <div className="aH h">
            <i className="fa fa-th-large" />
            Details
            {check.Details ? (
              <i
                className="fa fa-chevron-up ud"
                onClick={() => setCheck({ ...check, Details: false })}
              />
            ) : (
              <i
                className="fa fa-chevron-down ud"
                onClick={() => setCheck({ ...check, Details: true })}
              />
            )}
          </div>
          {check.Details ? (
            <div className="detailsList b">
              <div className="detailData">
                <div>Contract Address</div>
                <a className="dValue" href={contractAddressLink}>
                  {contractAddress}
                </a>
              </div>
              <div className="detailData">
                <div>Token ID</div>
                <div className="dValue">{tokenId}</div>
              </div>
              <div className="detailData">
                <div>Token Standard</div>
                <div className="dValue">ERC-721</div>
              </div>
              <div className="detailData">
                <div>Blockchain</div>
                <div className="dValue">{blockChain}</div>
              </div>
              <div className="detailData">
                <div>Last Updated</div>
                <div className="dValue">{lastUpdated}</div>
              </div>
              <div className="detailData">
                <div>Creator Earnings</div>
                <div className="dValue">{creatorEarnings}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </NftStateBox>
  );
};

export default NftState;