import "./Mypage.css";
import Card2 from './Card2'
import { useSelector } from "react-redux";
import MypageDef from "./MypageDef.png";
import {createRef, useState} from 'react';
import{useEffect} from 'react';
import ETH from "./ETH.svg"
import zzz from "./zzz.png"
import { Link } from "react-router-dom";


function Mypage() {
  const [account, setAccount] = useState("");
  const [NFT,setNFT] = useState(['']);
  const [NFT2,setNFT2] = useState([])
  const 더미계정 ='0x12344FAAF6d01Ff56D81Eb44eD2a911C6f991234'

let account1 =useSelector((state)=>state.account.account) //계정정보


const Wallet = async () => {
    //https://docs.metamask.io/guide/getting-started.html#basic-considerations 
    //메타마스크 공식 독스 참고.
    try {
      if (window.ethereum) {
        //Web3 브라우저 감지
        const accounts = await window.ethereum.request({method: "eth_requestAccounts",}); 
        // connect wallet account 기능. window.ethereum.request는 프로미스라서 비동기로 구현해야됨.
        // window.ethereum.request 을 console.log 참고

        setAccount(accounts[0]);
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
  
 
function check(){
  if(account==''){
    alert("지갑을 연결해주세요!")
  }
}

const 계정 = account1.accounts    //리덕스 툴킷 변수에 따로 담지않으면 오류생김...


const option = {method: 'GET'};

const NFT_Meta = async()=>{
  const response = await fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${계정}&order_direction=desc&offset=0&limit=3&include_orders=false`, option)
  const data = await response.json()
  setNFT2(data.assets.map((user)=>{
    return{
      name:user.name,
      image:user.image_url,
      comment:user.description,
      token_id:user.token_id,

    }
  }))}

useEffect(()=>{
  NFT_Meta()
  
  },[계정])
//const 계정 = account1.accounts    //리덕스 툴킷 변수에 따로 담지않으면 오류생김..... 하아...
//console.log(계정,"계정")

//로그아웃

  return (
    <div>
      <div className="mypage_bg">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      

    <div class="profile">
      
</div></div>
<br></br>
<br></br>

<p class="MainName">CodeStates</p>
<div><p className="Creater">제작자  <b>크립토펑크 4조</b></p></div>
<div><p className="Creater"><img src={ETH} alt="super eth" width={10} /> '{계정}'</p></div> 
<div>
        <div class="mypage_class">
            <div class="trending"
                  onClick={() => {
                  }}><Link to="/account">Collected</Link></div>
            <div ><Link to="/Created">Created</Link></div>
            <div class="drop-in-underline">Favorited</div>
            <div class="drop-in-underline">Activity</div>
            <div class="drop-in-underline"onClick={() => {

                  }}>More</div>
        </div>
        <hr></hr>
        <img src={zzz} alt="super eth" width={1300} />
    </div>





<div class="flex-container">
{NFT2&&NFT2.map((el,index)=>{
  return( 
    <div><Card2
  image={MypageDef&&el.image}
  series={el.comment}
  title={el.name}
  price
  tag="1"
  time="time"
  key = {index}
  /></div>
  )
} )}


<div><Card2
  image={MypageDef}
  series=''
  title="Defult"
  price="price"
  tag="tag"
  time
  /></div>
  <div><Card2
  image={MypageDef}
  series="Test series"
  title="Defult"
  price={1}
  tag={1}
  time
  /></div>
  <div><Card2
  image={MypageDef}
  series="Test series"
  title="Defult"
  price={2}
  tag={1}
  time
  /></div>  
  <div><Card2
  image={MypageDef}
  series="Test series"
  title="Defult"
  price={3}
  tag={1}
  time
  /></div>  
</div>
    </div>
  );
}





export default Mypage;
