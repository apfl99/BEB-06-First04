import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { textSkip } from "../../../libs/textSkip";
import CNftList from "./CNftList";

const CBodyBox = styled.div`
  width: 97vw;
  height: 500px;
  //background-color: bisque;
  margin-top: 50px;

  .topTap {
    font-weight: 500;
    //background-color: rgb(240, 248, 255);
    border-bottom: 2px solid rgba(95, 95, 95, 0.2);
    .tapBox {
      display: flex;
      justify-content: space-between;
      width: 150px;
      a {
        color: black;
      }
      div {
        padding-bottom: 6px;
        border-bottom: 2px solid black;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          color: black;
        }
      }
      .itemsTap {
        color: ${(props) =>
          props.tap === "items" ? "black" : "rgba(95, 95, 95, 0.5)"};
        border-bottom: ${(props) =>
          props.tap === "items" ? "2px solid black" : "0"};
      }
      .ActivityTap {
        color: ${(props) =>
          props.tap === "activity" ? "black" : "rgba(95, 95, 95, 0.5)"};
        border-bottom: ${(props) =>
          props.tap === "activity" ? "2px solid black" : "0"};
      }
    }
  }
  .searchBox {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .tapHide {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      font-size: 20px;
      //background-color: rgb(128, 128, 128);
      border-radius: 50%;
      transition: 0.3s;
      cursor: pointer;
      :hover {
        box-shadow: 0px 1px 10px rgba(128, 128, 128, 0.3);
      }
    }
    .sizeTap {
      display: flex;
      //background-color: rgb(128, 128, 128);
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        border: 2px solid rgba(128, 128, 128, 0.3);
        background-color: ${(props) =>
          props.nftSize === "middle" ? "rgba(128, 128, 128, 0.1)" : "white"};
        font-size: 20px;
        color: gray;
        cursor: pointer;

        :first-child {
          border-left: 2px solid rgba(128, 128, 128, 0.3);
          border-right: 0;
          border-radius: 10px 0px 0px 10px;
          background-color: ${(props) =>
            props.nftSize === "large" ? "rgba(128, 128, 128, 0.1)" : "white"};
        }
        :last-child {
          border-right: 2px solid rgba(128, 128, 128, 0.3);
          border-left: 0;
          border-radius: 0px 10px 10px 0px;
          background-color: ${(props) =>
            props.nftSize === "small" ? "rgba(128, 128, 128, 0.1)" : "white"};
        }
      }
    }
    input,
    button {
      width: 25%;
      border: 2px solid rgba(128, 128, 128, 0.3);
      border-radius: 10px;
      background-color: white;
      font-size: 16px;
      font-weight: 600;
      transition: 0.3s;
      :focus {
        border: 2px solid rgba(128, 128, 128, 0.9);
      }
      :last-child {
        cursor: pointer;
        color: rgb(56, 142, 255);
      }
    }
    input {
      padding-left: 10px;
      text-align: center;
    }
  }

  .optionOrNft {
    display: flex;
    margin-top: 10px;
    background-color: rgba(223, 223, 223, 0.1);
    .option {
      width: 30%;
      //height: 100%;
      overflow-y: auto;
      .op {
        display: flex;
        align-items: center;
        margin: 0px 10px 0px 10px;

        height: 50px;
        font-weight: 600;
        /* background-color: #d7ffde81; */
      }
      .line {
        height: 20px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.2);
      }
      .traits {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 10px 0px 0px 10px;
        border: 1px solid rgba(128, 128, 128, 0.1);
        font-weight: 600;
        .traits2 {
          /* display: flex;
          flex-direction: column; */
          margin-top: 10px;
          font-weight: 400;
        }
      }
    }
  }
`;

const CBody = ({ data }) => {
  const [more, setMore] = useState(false);
  const [descript, setDescript] = useState();
  const [nftSize, setNftSize] = useState("large");
  const params = useParams();
  const { account } = params;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tapName = searchParams.get("tap");

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1050 && !more) {
      setMore(true);
    } else if (more && window.innerWidth <= 1050) {
      setMore(false);
    }
  });
  useEffect(() => {
    textSkip(more, "🔍︎ Search by name or attirbute", 25, setDescript);
  }, [more]);

  return (
    <CBodyBox tap={tapName} nftSize={nftSize}>
      <div className="topTap">
        <div className="tapBox">
          <Link to={`/collection/${account}?tap=items`} state={data}>
            <div className="itemsTap">Items</div>
          </Link>
          <Link to={`/collection/${account}?tap=activity`} state={data}>
            <div className="ActivityTap">Activity</div>
          </Link>
        </div>
      </div>
      <div className="searchBox">
        <div className="tapHide">
          <i className="fa fa-align-justify" />
        </div>
        <input placeholder={descript} />
        <input placeholder="Price low to high" />
        <div className="sizeTap">
          <div
            onClick={() => (nftSize !== "large" ? setNftSize("large") : null)}
          >
            <i className="fa fa-th-large" />
          </div>
          <div
            onClick={() => (nftSize !== "middle" ? setNftSize("middle") : null)}
          >
            <i className="fa fa-th" />
          </div>
          <div
            onClick={() => (nftSize !== "small" ? setNftSize("small") : null)}
          >
            <i className="fa fa-th-list" />
          </div>
        </div>
        <button>Make collection offer</button>
      </div>

      <div className="optionOrNft">
        <div className="option">
          <div className="op">Status</div>
          <div className="op">Price</div>
          <div className="op">Quantuty</div>
          <div className="line"></div>
          {Object.keys(data.traits).length > 0
            ? Object.keys(data.traits).map((type, index) => (
                <div className="traits" key={index}>
                  {type}
                  {Object.keys(data.traits[type]).map((prop, index2) => (
                    <div className="traits2" key={index2}>
                      {prop} : {data.traits[type][prop]}
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>

        <CNftList data={data} nftSize={nftSize} />
      </div>
    </CBodyBox>
  );
};

export default CBody;
