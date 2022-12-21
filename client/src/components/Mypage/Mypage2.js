import "./Mypage.css";
import Card2 from './Card2'
import MypageDef from "./MypageDef.png";
import {createRef, useState} from 'react';
import{useEffect} from 'react';
import ETH from "./ETH.svg"
import zzz from "./zzz.png"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Mypage2() {
  const [account, setAccount] = useState("");
  const [NFT,setNFT] = useState(['']);
  const [NFT2,setNFT2] = useState([])
  const 더미계정 ='0x12344FAAF6d01Ff56D81Eb44eD2a911C6f991234'

 let account1 =useSelector((state)=>state.account.account) //계정정보

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
            <div class="drop-in-underline"
                  onClick={() => {
                  }}><Link to="/account" >Collected</Link></div>
                  <div class="trending"><Link to="/Created">Created</Link></div>
            <div>Favorited</div>
            <div>Activity</div>
            <div onClick={() => {
                   
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
  time
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



export default Mypage2;
