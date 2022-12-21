import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeAccount } from "./store";
import {
  MdSearch,
  MdOutlineAccountCircle,
  MdOutlineAccountBalanceWallet,
  MdLockOpen,
} from "react-icons/md";
//npm install react-icons --save 리액트 아이콘 사용 https://react-icons.github.io/react-icons/ 참고..!

function Header() {
  const [backgroubackgroundColor, setbackgroubackgroundColor] = useState("");
  const [account, setAccount] = useState("");
  const [로그인, set로그인] = useState(false);
  let account1 =useSelector((state)=>{return state})
  let dispatch = useDispatch()

  /*
const [WalletAddr,setWalletAddr] = useState(null)

const WalletConnect = async() => {
  const WalletCon = await window.ethereum.request({method: 'eth_requestAccounts'});

  setWalletAddr(accounts[0])
}
  */

  const changeBackground = () => {
    if (window.screenY >= 20) {
      setbackgroubackgroundColor(true);
    } else {
      setbackgroubackgroundColor(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const Wallet = async () => {
    //https://docs.metamask.io/guide/getting-started.html#basic-considerations
    //메타마스크 공식 독스 참고.
    try {
      if (window.ethereum) {
        //Web3 브라우저 감지
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // connect wallet account 기능. window.ethereum.request는 프로미스라서 비동기로 구현해야됨.
        // window.ethereum.request 을 console.log 참고
        set로그인(true);
        dispatch(changeAccount({accounts})) 
        
        //console.log(accounts);
        // 연결된 메타마스크의 주소를 useState에 담는다

        //getItemsByOwner
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //로그아웃 기능 / 테스트 중 /
  const handleAccount = (ethereum) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) {
      reload();
    }
  };
  const reload = () => window.location.reload();

  const backgroubackgroundColor_before = { opacity: "1" };
  const backNbackgroubackgroundColor_after = { backgroundColor: "white" };

  const logout = async () => {
    if (account1 == "") {
      alert("로그인해주세요");
    } else {
      set로그인(false);
      setAccount("");
      dispatch(changeAccount(""))
      window.location.reload()
      alert("로그아웃 했습니다.");
    }
  };

  return (
    <div>
      <div
        className="menu-large"
        style={
          backgroubackgroundColor
            ? backNbackgroubackgroundColor_after
            : backgroubackgroundColor_before
        }
      >
        <div>
          <span>
            <h2>
              <Link to="/" className="title">
                <img
                  src="https://storage.googleapis.com/opensea-static/Logomark/OpenSea-Full-Logo%20(dark).png"
                  height="35"
                  alt=""
                />
              </Link>
            </h2>
          </span>
        </div>
        <div className="search-container">
          <div className="icon">
            <MdSearch className="search-icon" />
          </div>
          <input
            className="search-input"
            placeholder="Search items, collections, and accounts"
          />
        </div>

        <div>
          <ul className="menu-item-container">
            <li>
              <div className="menu-item" onClick={() => {}}>
                Explore
              </div>
            </li>
            <li>
              <div className="menu-item" onClick={() => {}}>
                Stats
              </div>
              {/* <Link to="/explore" className="menu-item">
                Explore
</Link>*/}
            </li>
            <li>
              <div className="menu-item">Resourses</div>
              {/* <Link to="/activity" className="menu-item">
                Activity
</Link>*/}
            </li>
            <li>
            <Link to="/create">
              <div className="menu-item">crate</div>
                </Link>
            </li>

            <li>
            <Link to="/account" className="menu-icon">
              <MdOutlineAccountCircle
                className="menu-icon"
                onClick={() => {
                  
                  //  connectWallet();
                }}
              />
              </Link>
            </li>
            {/*<Link
                // to="/mypage"
             // className={login ? "menu-item login" : "menu-item"} 
              > 
                <MdAccountCircle
                  className="menu-icon"
                  onClick={() => {
                    connectWallet();
                  }}
                />
                </Link>
            </li>
            <li>
            {/*  <Link to="/" className="menu-item">
                <MdOutlineAccountBalanceWallet
                  className="menu-icon"
                  onClick={() => {
                    connectWallet();
                  }}
                />
                </Link>  */}
            <li>
            
              <MdOutlineAccountBalanceWallet
                className="menu-icon"
                onClick={() => {
                  Wallet();
                }}
              />
            </li>
            <li>
              {로그인 ? (
                <p
                  className="menu-item"
                  onClick={() => {
                    logout();
                    setAccount("")
                  }}
                >
                  로그아웃
                </p>
              ) : (
                <li>
                  <MdLockOpen className="menu-icon" />
                </li>
              )}
            </li>
            {/* <li>
              <Link to="/" className="menu-item">            
                <div
                  onClick={() => {
                    logOut();
                  }}>Logout
                </div>
              </Link>             
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
