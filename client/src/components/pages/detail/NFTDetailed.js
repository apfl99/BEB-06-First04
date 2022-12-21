import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import NftState from "./NftState";
import NftInfo from "./NftInfo";
import { useParams } from "react-router-dom";
import { getSellingInfo } from "../../../libs/getSellInfo";
import { getCurrentAccount } from "../../../libs/getCurrentUser";

//sell modal
import Modal from "react-modal";
import "../../../sellModal.css";
import { approveAll } from "../../../libs/approveAll";
import { listingNft } from "../../../libs/listingNFT";

// Loading
import LoadingOverlay from "react-loading-overlay";
import "../../../loading.css";
import { DarkBackground } from "../../common/Loading";

//Buy
import { purchaseNft } from "../../../libs/parchaseNft";

const Web3 = require("web3");

const NFTDetailedBox = styled.div`
  width: 100vw;
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nftBody {
    display: flex;
    justify-content: space-between;
    width: 1000px;
  }
  .infoHeader {
    font-size: 16px;
    margin-top: 8px;
    .cHName {
      font-size: 16px;
    }
    .cName {
      margin-top: 18px;
      font-size: 28px;
      font-weight: bold;
    }
    .ownerName {
      margin-top: 18px;
      color: #616161eb;
    }
    .ownedInfos {
      margin-top: 36px;
    }
    .viewNum {
      color: #616161eb;
    }
    .favNum {
      color: #616161eb;
    }
  }

  .infoBody {
    font-size: 18px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    border-bottom: 1px solid var(--footer-border-bottom);
    width: flex;
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
    }
  }

  .iconBox {
    margin: 5px 0px 0px 8px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .infoBody {
    border: 1px solid var(--footer-border-bottom);
    border-radius: 15px;
    .saleInfo {
      .timeInfo {
        font-size: 15px;
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid var(--footer-border-bottom);
        div {
          margin-left: 5px;
        }
      }
      .buyBox {
        width: 650px;
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
            font-size: 35px;
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
            font-weight: 700;
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

const customStyle = {
  content: {
    width: "50%",
    height: "70%",
    margin: "auto",
    display: "block",
    padding: "10px 30px 40px",
  },
};

function NFTDetailed() {
  const params = useParams();
  const [result, setResult] = useState(false);
  const [floorPrice, setFloorPrice] = useState(null);
  const [name, setName] = useState(null);
  const [collectionName, setCollectionName] = useState(null);
  
  const collectionNameLink = `http://localhost:3000/collection/${collectionName}`;
  const [ownerName, setOwnerName] = useState(null);

  //판매 정보, 현재 메타마스크 계정
  const [sellInfo, setSellInfo] = useState({});
  const [curUser, setCurUser] = useState("");

  //Sell Modal
  const [imgPreView, setImgPreview] = useState({}); // img
  const [modalIsOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState(""); // 가격
  // loading overlay
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);
  useEffect(() => {
    // 판매 정보 가져오기 : floorPrice 변수 저희 컨트랙의 판매가로 변경하겠습니다!
    const getSelling = async () => {
      const sellInfo = await getSellingInfo(params.address, params.tokenId);
      setSellInfo(sellInfo);
      const price_eth = Web3.utils.fromWei(sellInfo.price, "ether");
      setFloorPrice(price_eth);

      //현재 접속 계정 가져오기
      const currentUser = await getCurrentAccount();
      setCurUser(currentUser);
      
      axios
        .get(`http://localhost:3001/assets/${params.address}/${params.tokenId}`)
        .then((result) => {
            console.log(result)
            
            const _result = result
            const name = result.data.name;
            const collectionName = (result.data.asset_contract.name);
            console.log(result.data.owner.user)
          if (result.data.owner.user == null) {
            if(result.data.creator.user.username==null){
              const ownerName = result.data.creator.address;
              setOwnerName(ownerName);
            } else{
              // const ownerName = result.data.creator.user.username;
              // setOwnerName(ownerName);
            }

            
          } else {
            const ownerName = result.data.owner.user.username;
            setOwnerName(ownerName);
          }
    
          // const floorPrice = result.data.collection.stats.floor_price;

          setResult(_result);
          setName(name);
          setCollectionName(collectionName);
          // setFloorPrice(floorPrice);
        })
        .catch((err) => console.log(err));

      // set img Preview
      const options = { method: "GET" };
      fetch(
        `https://testnets-api.opensea.io/api/v1/assets?token_ids=${params.tokenId}&asset_contract_address=${params.address}&order_direction=desc&offset=0&limit=20&include_orders=false`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setImgPreview(response.assets[0].image_original_url);
        })
        .catch((err) => console.error(err));
    };
    getSelling();
  }, [params, result]);

  //Modal
  function closeModal() {
    setIsOpen(false);
  }

  // price 핸들링
  const handleChangePrice = async (e) => {
    await setPrice(e.target.value);
  };

  async function listing() {
    // listing
    if (typeof window.ethereum !== "undefined") {
      // 메타마스크 연결되어 있어야 함
      setLoaded(true);
      try {
        // 해당 콜랙션에 대한 모든 권한 승인 및 판매 등록
        const approve_result = await approveAll(params.address);
        console.log(approve_result);

        const listing_result = await listingNft(
          params.address,
          params.tokenId,
          price
        );
        console.log(listing_result);
        window.alert("판매 등록이 완료되었습니다.");
      } catch (e) {
        setLoaded(false);
        window.alert("판매 등록이 실패했습니다.");
        return;
      }
      setLoaded(false);
      setIsOpen(false);
    }
  }

  //Buy 버튼 눌렀을 때 함수
  async function handleListing() {
    setIsOpen(true);
  }

  //Buy 버튼 눌렀을 때 함수
  async function handleBuy() {
    purchaseNft(params.address, params.tokenId, floorPrice);
  }

  //buyBtn Set
  /*
    1. ownerName이 현재 메타 마스크 계정과 같고, 판매중이 아닐 경우 : 판매 등록 버튼
    2. ownerName이 현재 메타 마스크 계정과 같고, 판매중일 경우 : on Sale에 disable
    3. ownerName이 현재 메타 마스크 계정과 다르고, 판매중이 아닐 경우 : Not on Sale에 disable
    4. ownerName이 현재 메타 마스크 계정과 다르고, 판매중일 경우 : 구매 버튼
  */
  function buyBtnSet() {
    console.log(ownerName);

    if (ownerName === curUser) {
      if (sellInfo.price == "0") {
        // 1
        return (
          <button className="cartB" id="txBtn" onClick={handleListing}>
            Listing Item
          </button>
        );
      } else {
        // 2
        return (
          <button className="cartB" id="txBtn" disabled={true}>
            On Sale
          </button>
        );
      }
    } else {
      if (sellInfo.price == "0") {
        // 3
        return (
          <button className="cartB" id="txBtn" disabled={true}>
            Not on Sale
          </button>
        );
      } else {
        return (
          <button className="cartB" id="txBtn" onClick={handleBuy}>
            Buy
          </button>
        );
      }
    }
  }

  return (
    <NFTDetailedBox>
      <div className="nftBody">
        <NftState props={result} />
        <div className="nftInfo">
          <div className="infoHeader">
            <div className="cinfo">
              <a className="cHName" href={collectionNameLink}>
                {collectionName}
              </a>
              <div className="cLinks">
                <div className="cLink">
                  <i />
                </div>
                <div className="cLink">
                  <i />
                </div>
                <div className="cLink">
                  <i />
                </div>
                <div className="cLink">
                  <i />
                </div>
              </div>
            </div>

            <div className="cName">{name}</div>
            <div className="addInfos">
              <p className="ownedInfos">
                <span className="ownerName">Owned by {ownerName}</span>&emsp;
                <span className="viewNum">
                  <span>
                    <i className="fa fa-eye" />
                  </span>
                  <span>&nbsp;&nbsp;{17} views</span>
                </span>
              </p>
              <div className="favNum">
                <i />
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
                <span className="buyText">Current price</span>
                <span className="buyPrice">
                  <i />
                  <span className="buyEthe">
                    <span className="iconBox">
                      <img
                        src="../../images/logo/ethereum-logo.png"
                        alt="ethe-logo"
                      />
                    </span>
                    {floorPrice}
                  </span>
                  <span className="buyChangeEthe">$ 0.0</span>
                </span>
                <div className="buyButtons">
                  {
                    /*
                    1. ownerName이 현재 메타 마스크 계정과 같고, 판매중이 아닐 경우 : 판매 등록 버튼
                    2. ownerName이 현재 메타 마스크 계정과 같고, 판매중일 경우 : on Sale에 disable
                    3. ownerName이 현재 메타 마스크 계정과 다르고, 판매중이 아닐 경우 : Not on Sale에 disable
                    4. ownerName이 현재 메타 마스크 계정과 다르고, 판매중일 경우 : 구매 버튼
                  */
                    buyBtnSet()
                  }
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyle}
        contentLabel="List Item For Sale"
      >
        <h1>List Item For Sale</h1>
        <br></br>
        <h3>Preview</h3>
        <div className="imgPreviewBox">
          <div className="imgDiv">
            <img className="imgPreview" src={imgPreView} />
          </div>
        </div>
        <br></br>
        <h3>Price</h3>
        <div className="priceBox">
          <input
            type="text"
            id="price"
            name="price"
            onChange={handleChangePrice}
            value={price}
            required
            size="30"
            className="price"
          ></input>
          <div className="eth"> ETH</div>
        </div>
        <br></br>
        <br></br>
        <button className="registerBtn" onClick={listing}>
          <h3>Sell</h3>
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className="closeBtn" onClick={closeModal}>
          <h3>Cancel</h3>
        </button>
      </Modal>
      <DarkBackground disappear={loaded}>
        <LoadingOverlay active={true} spinner={true} text="Listing Your NFT...">
          <p></p>
        </LoadingOverlay>
      </DarkBackground>
    </NFTDetailedBox>
  );
}

export default NFTDetailed;