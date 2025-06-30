const { EmbedBuilder } = require("discord.js");
const fetchServerData = require("../utils/fetchServerData");
const { FIVEM_SERVER_IP } = require("../config");

let statusMessage = null;
let previousData = null;

function createEmbed(data) {
  return new EmbedBuilder()
    .setColor(data.online ? 0x14809c : 0xff0000)
    .setTitle("Your Server Name Here") // Replace with your server name
    .addFields(
      { name: "STATUS", value: data.online ? "🟢 Online" : "🔴 Offline", inline: true },
      { name: "PLAYERS", value: `${data.playerCount}/${data.maxPlayers}`, inline: true },
      { name: "F8 CONNECT COMMAND", value: `\`\`\`commandline\nconnect ${FIVEM_SERVER_IP}\`\`\``, inline: true }
    )
    .setImage("https://your-image-url.com/image.png") // Replace with your image URL or remove this line
    .setFooter({ text: "Your Server Name Here" }); // Replace with your server name
}

async function updateServerStatus(channel) {
  const currentData = await fetchServerData();

  if (!statusMessage) {
    const embed = createEmbed(currentData);
    statusMessage = await channel.send({ embeds: [embed] });
  } else {
    if (
      currentData.online !== previousData?.online ||
      currentData.playerCount !== previousData?.playerCount
    ) {
      const embed = createEmbed(currentData);
      await statusMessage.edit({ embeds: [embed] });
    }
  }
  previousData = currentData;
}

module.exports = {
  name: "status",
  description: "Displays the FiveM server status",
  execute: async (interaction) => {
    await updateServerStatus(interaction.channel);
    setInterval(() => updateServerStatus(interaction.channel), 60 * 1000);
  },
};
