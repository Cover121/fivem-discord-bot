const { GUILD_ID } = require("../config");

module.exports = (client) => {
  client.once("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return console.warn("Guild not found");

    // Register commands for this guild
    const commands = [
      {
        name: "status",
        description: "Displays the FiveM server status",
      },
    ];

    await guild.commands.set(commands);
  });
};
