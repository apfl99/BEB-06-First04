import "./card2.css"
import React from "react";
import ETH from "./ETH.svg"

export default function Card2({image,series,title,price,tag,time}){
   

    return <div className="card">
        <div className="card-image">
            <img src={image} alt="super" width={"250"} height={"300"} />
        </div>
    
    <div className="card-content">
        <div className="card-heading">
            <span className="card-series">{series}</span>
            <span className="card-top"></span>
        </div>
        <div className="card-details">
            <h4 className="card-title">{title}</h4>
            <div className="card-price">
                <img src={ETH} alt="super eth" width={15} />
                <h4>{price} ETH</h4>
            </div>
        </div>
       <div className="card-sub-details">
        <span>#{tag}</span>
        <span>{time} day left</span>
       </div>
    </div>

</div>;
}
