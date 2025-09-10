const { Client, GatewayIntentBits, EmbedBuilder, Embed } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(welcomeChannel) {
        const channelEmbed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('🕯️ A new Wanderer enters the Bergmann Archives...')
            .setDescription(`Welcome, **${member.user.username}**!`)
            .setTimestamp();
        welcomeChannel.send({ embeds: [channelEmbed] });
    }
    const dmEmbed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle(`🕯️ Welcome, ${member.user.username}, to the Bergmann Archives!`)
        .setDescription(
            `The world outside is overrun by the dead, but within these Archives, knowledge survives.

            🔎 First, read through #rules.
            🟢 Then, in #choose-your-faction, decide your path:
            — Join the Survivors, fighting for hope.
            — Or embrace the Infected, and spread the darkness.

            Your fate is yours to choose.`
        )
        .setTimestamp();
    member.send({ embeds: [dmEmbed] }).catch(err => console.log(`Could not DM ${member.user.tag}.`));
});

client.login(TOKEN)