import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #98fb98;
  color: var(--footer-text);
  margin-top: 50px;
  .headerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 30px;

    h4 {
      margin: 20px 0px;
      text-align: center;
    }
    .inputBox {
      display: flex;
      justify-content: space-between;
      width: 100%;
      //background-color: rgba(211, 193, 193, 0.637);
      input {
        width: 60vw; // 660px
        height: 50px;
        padding-left: 20px;
        border: 2px solid rgba(128, 128, 128, 0.1);
        border-radius: 15px;
        font-size: 16px;
      }
      button {
        width: 15vw; // 130px
        background-color: #c8ffc8;
        border: 2px solid #c8ffc8;
        border-radius: 15px;
        font-size: 16px;
        font-weight: bold;
        color: var(--footer-text);
        transition: background-color 0.1s;
        cursor: pointer;
        :hover {
          background-color: #e0ffe0;
        }
      }
    }
  }

  .communityBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    margin-top: 35px;
    border-bottom: 1px solid var(--footer-border-bottom);

    .text {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .communityImgBox {
      display: flex;
      justify-content: space-between;
      width: 350px;
      margin: 15px auto 30px auto;
      text-align: center;
      //background-color: #4b804b;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 55px;
        height: 55px;
        background-color: #c8ffc8;
        border-radius: 10px;
        transition: 0.1s;
        cursor: pointer;
        :hover {
          background-color: #e0ffe0;
        }
      }
    }
  }

  .linkBox {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    width: 80%;
    height: 430px;
    border-bottom: 1px solid var(--footer-border-bottom);
    .openseaInfo {
      display: flex;
      flex-direction: column;
      width: 180px;
      transform: translateY(-10px);
      img {
        width: 45px;
        height: 45px;
      }
      h2 {
        color: var(--footer-text);
        margin: 10px 0px;
        cursor: pointer;
      }
      div {
        font-weight: 700;
      }
    }
    .links {
      display: flex;
      justify-content: space-between;
      width: 550px;
      margin-right: 10px;
      .lb {
        font-weight: 700;

        div:first-child {
          margin-top: 30px;
        }
        div {
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          margin-top: 10px;
        }
      }
      .statsBox {
        margin-top: 50px;
      }
    }
  }
  .etcBox {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 30px 0px;
    font-size: 12px;
    font-weight: 500;
    .support {
      display: flex;
      justify-content: space-between;
      width: 180px;
      a {
        color: var(--footer-text);
        :hover {
          font-weight: 700;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterBox>
      <div className="headerBox">
        <h3>Stay in the loop</h3>
        <h4>
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating OpenSea.
        </h4>
        <div className="inputBox">
          <input type="email" placeholder="Your email address" />
          <button>Sign up</button>
        </div>
      </div>

      <div className="communityBox">
        <div className="text">Join the community</div>
        <div className="communityImgBox">
          <div>
            <i className="fa fa-twitter fa-2x" />
          </div>
          <div>
            <i className="fa fa-instagram fa-2x" />
          </div>
          <div>
            <i className="fa fa-reddit-alien fa-2x" />
          </div>
          <div>
            <i className="fa fa-youtube-play fa-2x" />
          </div>
          <div>
            <i className="fa fa-envelope-o fa-2x" />
          </div>
        </div>
      </div>

      <div className="linkBox">
        <div className="openseaInfo">
          <img src="/images/logo/logomark-White.png" alt="OpenSeaIcon" />
          {/* 서버 구축하고 메인 페이지 링크 수정*/}
          <Link to="/">
            <h2>OpenSea</h2>
          </Link>

          <div>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </div>
        </div>

        {/* 링크 아직 설정 안함 */}
        <div className="links">
          <div className="marketplaceBox lb">
            Marketplace
            <div>All NFTs</div>
            <div>Solana NFTs</div>
            <div>Art</div>
            <div>Collectibles</div>
            <div>Domain Names</div>
            <div>Music</div>
            <div>Photography</div>
            <div>Sports</div>
            <div>Trading Cards</div>
            <div>Utility</div>
            <div>Virtual Worlds</div>
          </div>
          <div className="mSBox">
            <div className="myAccountBox lb">
              My Account
              <div>Profile</div>
              <div>Favorites</div>
              <div>Watchlist</div>
              <div>My Collections</div>
              <div>Settings</div>
            </div>
            <div className="statsBox lb">
              Stats
              <div>Rankings</div>
              <div>Activity</div>
            </div>
          </div>
          <div className="resourcesBox lb">
            Resources
            <div>Learn</div>
            <div>Help Center</div>
            <div>Platform Status</div>
            <div>Partners</div>
            <div>Taxes</div>
            <div>Blog</div>
            <div>Docs</div>
            <div>Newsletter</div>
          </div>
          <div className="companyBox lb">
            Company
            <div>About</div>
            <div>Careers</div>
            <div>Ventures</div>
            <div>Grants</div>
          </div>
        </div>
      </div>

      <div className="etcBox">
        <div className="companyInfo">© 2018 - 2022 Ozone Networks, Inc</div>
        <div className="support">
          <a href="https://opensea.io/privacy">Privacy Policy</a>
          <a href="https://opensea.io/tos">Terms of Service</a>
        </div>
      </div>
    </FooterBox>
  );
};

export default Footer;
