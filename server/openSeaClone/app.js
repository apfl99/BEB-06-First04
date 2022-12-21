const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// 라우팅 변수 설정
const openseaNFTSearchRouter = require("./router/openseaNFTSearchRouter");
const openseaNFTMetadata = require("./controller/openseaNFTMetadata");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// 라우팅 예시 :https://docs.opensea.io/reference/retrieving-collections-testnets
app.use("/openseaNFTSearch", openseaNFTSearchRouter);

//Logging
const myLogger = function (req, res, next) {
  console.log(`http request method is ${req.method}, url is ${req.url}`);
  next(); // 안넣어주면 로그 이후로 안넘어감
};
app.use(myLogger);

// home
app.get("/", (req, res) => {
  res.status(200).send("Welcome, openSeaClone");
});

//NFTdetailed
app.get("/assets/:address/:id", openseaNFTMetadata);

//에러 처리
app.use((req, res, next) => {
  res.status(404).send("Not Found!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    stacktrace: err.toString(),
  });
});

app.listen(port, () => {
  console.log(`[RUN] openSeaClone Server... | http://localhost:${port}`);
});

module.exports = app;
