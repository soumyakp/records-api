const express = require('express');

const router = express.Router();
const fs = require('fs');

router.post('/records', async (req, res) => {
  try {
    const rawdata = fs.readFileSync('data.json');
    const records = JSON.parse(rawdata);
    if (!records) {
      return res.status(404).send();
    }
    let startIndex = 0; // If pageNum not porvided
    let endIndex = 10; // If pageSize not porvided
    if (req.body.pageSize && req.body.pageNum) {
      startIndex = +(req.body.pageSize * req.body.pageNum - req.body.pageSize);
      endIndex = +(req.body.pageSize * req.body.pageNum);
    }
    const prevPageNum = req.body.pageNum - 1;
    const nxtPageNum = req.body.pageNum + 1;
    const recordChunk = records.data.slice(startIndex, endIndex);
    res.send({
      ids: recordChunk.map((item) => item.id),
      open: recordChunk.filter((item) => item.disposition === 'open'),
      previousPage: prevPageNum === 0 ? null : prevPageNum,
      nextPage:
        nxtPageNum > records.data.length / req.body.pageSize ? null : nxtPageNum
    });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
