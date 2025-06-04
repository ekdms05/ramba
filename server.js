const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/character", async (req, res) => {
  const { name, server } = req.query;
  const apiKey = process.env.NEXON_API_KEY;

  try {
    const idRes = await fetch(`https://open.api.nexon.com/baram/v1/id?character_name=${name}&server_name=${server}`, {
      headers: { "x-nxopen-api-key": apiKey }
    });
    const idData = await idRes.json();
    if (!idData.ocid) return res.status(404).json({ error: "캐릭터를 찾을 수 없습니다" });

    const charRes = await fetch(`https://open.api.nexon.com/baram/v1/character/basic?ocid=${idData.ocid}`, {
      headers: { "x-nxopen-api-key": apiKey }
    });
    const charData = await charRes.json();
    res.json(charData);
  } catch (e) {
    res.status(500).json({ error: "API 요청 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
