import React from "react";
import "./App.css";
import MintNFT from "./components/pages/minting/MintNFT";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/pages/main/Main";
import ScrollToTop from "./components/common/ScrollToTop";
import NFTDetailed from "./components/pages/detail/NFTDetailed";
import Category from "./components/pages/category/Category";
import Haeder from "./components/Header/Header";
import Collection from "./components/pages/collection/Collection";
import Mypage from "./components/Mypage/Mypage";
import Mypage2 from "./components/Mypage/Mypage2";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Haeder />
        <ScrollToTop />
        <Routes>
          {/* Main -> 메인 페이지 */}
          <Route path="/" element={<Main />} />
          {/* account -> 마이 페이지 */}
          <Route path="/account" element={<Mypage />} />
          <Route path="/created" element={<Mypage2 />} />
          <Route path="/assets/:address/:tokenId" element={<NFTDetailed />} />

          <Route path="/collection/:account" element={<Collection />} />
          {/* category -> 테마별 페이지 */}
          <Route path="/category/:theme" element={<Category />} />
          <Route path="/create" element={<MintNFT />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
