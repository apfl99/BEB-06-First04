import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../../mintTable.css";
import { FaFileUpload } from "react-icons/fa";
import { Buffer } from "buffer";
import { client } from "../../../libs/linkIpfs"; // IPFS 연결 라이브러리
import { mint } from "../../../libs/mintWithMetamask"; // IPFS 연결 라이브러리

// Loading
import LoadingOverlay from "react-loading-overlay";
import "../../../loading.css";
import { DarkBackground } from "../../common/Loading";

const fileTypes = [
  "JPG",
  "PNG",
  "GIF",
  "SVG",
  "MP4",
  "WEBM",
  "MP3",
  "WAV",
  "OGG",
  "GLB",
  "GLTF",
];

function MintNFT() {
  const [imgUrl, setImgUrl] = useState(null); // 미리보기를 위한 imgURL
  const [imgIpfsUrl, setImgIpfsUrl] = useState(""); // metadata 작성을 위한 ipfsUrl
  const [name, setName] = useState(""); // 이름
  const [description, setDescription] = useState(""); // 설명

  // loading overlay
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  // 이미지 미리보기를 위한 URL Get
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob); // URL get
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgUrl(reader.result);
        resolve();
      };
    });
  };

  // upload file 핸들링
  const handleChangeFile = async (file) => {
    encodeFileToBase64(file); // 이미지 미리보기를 위한 URL Get

    //IPFS 파일올리고 url 정의
    await ipfsUpload(file);
  };

  // 이미지에 대한 IPFS url Get
  const ipfsUpload = async (file) => {
    const added = await client.add(file);
    const url = `https://openseaclone.infura-ipfs.io/ipfs/${added.path}`; // 전용 게이트 웨이 등록 infura IPFS 사용
    setImgIpfsUrl(url);
    console.log(url);
  };

  // name 핸들링
  const handleChangeName = async (e) => {
    await setName(e.target.value);
  };

  // description 핸들링
  const handleChangeDescription = async (e) => {
    await setDescription(e.target.value);
  };

  // Create 버튼 누르면
  const handleChangeCreateBtn = async (e) => {
    var checkVaild = 0;

    // required field 유효성 검사
    if (name.length === 0) {
      document.getElementById("name-message").style.display = "block";
      checkVaild++;
    }
    if (imgUrl === null) {
      document.getElementById("img-message").style.display = "block";
      checkVaild++;
    }

    if (checkVaild > 0) {
      return;
    }

    //MetaData 생성
    const metadata = {
      name: name, // 토큰 이름
      description: description, // 토큰 설명
      image: imgIpfsUrl, // 이미지 URI
    };

    const buffer = Buffer.from(JSON.stringify(metadata)); //ipfs 업로드를 위한 파일화

    //json(metadata) ipfs 등록 및 tokenURI 반환
    const added = await client.add(buffer);
    const tokenURI = `https://openseaclone.infura-ipfs.io/ipfs/${added.path}`; // 전용 게이트 웨이 등록 infura IPFS 사용
    console.log(tokenURI);

    // minting
    if (typeof window.ethereum !== "undefined") {
      // 메타마스크 연결되어 있어야 함
      setLoaded(true);
      try {
        const result = await mint(tokenURI);
      } catch (e) {
        setLoaded(false);
        return;
      }
      setLoaded(false);
    }
  };

  // 파일 업로드 박스
  const uploadBox = (
    <div className="uploadBox">
      <br></br>
      <FaFileUpload size="100" className="uploadIcon" />
      <h3 className="uploadText">please drag and drop here</h3>
    </div>
  );

  return (
    <div className="container">
      <div className="header"></div>
        <h1>Create New Item</h1>
        <br></br>
        <span className="red">* </span>Required fields
        <br></br>
        <br></br>
        <h3 className="imgTitle">
          Image, Video, Audio, or 3D Model <span className="red"> *</span>
        </h3>
        <br></br>
        <h5 className="opacity">
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF.
        </h5>
        <h5 className="opacity">Max size: 100 MB</h5>
        {imgUrl == null ? (
          <FileUploader
            children={uploadBox}
            className="test"
            handleChange={handleChangeFile}
            name="file"
            multiple={false}
            maxSize="100"
            types={fileTypes}
            hoverTitle=""
          ></FileUploader>
        ) : (
          <img className="uploadedFile" src={imgUrl}></img>
        )}
        <p id="img-message" className="ImgMessage">
          Image Field Required!!
        </p>
        <br></br>
        <h3>
          Name<span className="red"> *</span>
        </h3>
        <input
          className="name"
          type="text"
          id="name"
          name="name"
          onChange={handleChangeName}
          value={name}
          required
          size="70"
        ></input>
        <p id="name-message" className="NameMessage">
          Name Field Required!!
        </p>
        <br></br>
        <h3>Description</h3>
        <h5 className="opacity">
          The description will be included on the item's detail page underneath
          its image.
        </h5>
        <textarea
          className="description"
          id="description"
          name="description"
          onChange={handleChangeDescription}
          value={description}
        ></textarea>
        <br></br>
        <br></br>
        <button className="mintBtn" onClick={handleChangeCreateBtn}>
          <h3>Create</h3>
        </button>
      <DarkBackground disappear={loaded}>
        <LoadingOverlay active={true} spinner={true} text="Minting Your NFT...">
          <p></p>
        </LoadingOverlay>
      </DarkBackground>
    </div>
  );
}

export default MintNFT;
