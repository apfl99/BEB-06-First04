import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../common/Footer";
import CategoryList from "./CategoryList";
import NftList from "./NftList";
import Slider from "./Slider";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgb(255, 255, 255)
    ),
    url("/images/main/mainBg.jpg");

  background-repeat: no-repeat;
  background-size: 100% 20%;
  .header {
    width: 100%;
    height: 70px;
    padding: 10px 10px 10px 50px;
    font-size: 32px;
  }
  .bodyBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 97vw;
  }
`;

const Main = () => {
  const [data, setData] = useState([]);

  const collectionsTest = () => {
    try {
      axios
        .get(
          `https://testnets-api.opensea.io/api/v1/collections?offset=0&limit=200`
        )
        .then((res) => {
          let infoArr = [];
          for (let i = 0; i < res.data.collections.length; i++) {
            if (
              (res.data.collections[i].image_url ||
                res.data.collections[i].stats.one_day_volume > 0) &&
              infoArr.length < 10
            ) {
              infoArr.push(res.data.collections[i]);
            }
          }
          setData(infoArr);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    collectionsTest();
  }, []);

  return (
    <MainBox>
      <div className="header"></div>
      <div className="bodyBox">
        <Slider data={data} />

        {/* nft list */}
        <NftList data={data} />

        {/* theme list */}
        <CategoryList />
      </div>
      <Footer />
    </MainBox>
  );
};

export default Main;
