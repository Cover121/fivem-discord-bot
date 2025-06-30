const axios = require("axios");
const { FIVEM_SERVER_IP, FIVEM_SERVER_PORT } = require("../config");

async function fetchServerData() {
  try {
    const infoResponse = await axios.get(`http://${FIVEM_SERVER_IP}:${FIVEM_SERVER_PORT}/info.json`);
    const playersResponse = await axios.get(`http://${FIVEM_SERVER_IP}:${FIVEM_SERVER_PORT}/players.json`);

    const info = infoResponse.data;
    const players = playersResponse.data;

    return {
      online: true,
      playerCount: players.length,
      maxPlayers: info.vars.sv_maxClients,
    };
  } catch (error) {
    console.error("Error fetching FiveM server data:", error);
    return { online: false, playerCount: 0, maxPlayers: 0 };
  }
}

module.exports = fetchServerData;
