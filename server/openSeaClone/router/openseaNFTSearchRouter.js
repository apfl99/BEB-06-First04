const { findByOwnerAddr } = require('../controller/openseaNFTSearchController'); // 해당 Controller의 함수 불러오기
const express = require('express');
const router = express.Router();


//get 형식으로 findByOwnerAddr 함수 실행
router.get('/:owner_address', findByOwnerAddr); // 해당 Controller의 함수 불러오기, owner_address에 파라미터

module.exports = router;
