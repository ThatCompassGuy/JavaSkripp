const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Puts a user in timeout.')
        .addMentionableOption((option) =>
            option
                .setName('member')
                .setDescription('The member to timeout.')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('time')
                .setDescription('The amount of time to timeout this user (in seconds).')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('reason')
                .setDescription('The reason to timeout this user.')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has('922103953750106113')) {
            await interaction.reply('You are not Mod why are you even trying?');
        }

        const options = interaction.options?._hoistedOptions;
        const guild = options[0].member.guild;
        const memberId = options[0].user.id;

        guild.members.fetch(memberId).then(async (member) => {
            if (member.isCommunicationDisabled()) {
                await interaction.reply(`${member.user.username} is already timed out!`);
            }

            member.timeout(ms(`${options[1].value}s`), options[2]?.value);

            await interaction.reply(`${member.user.username} was timed out for ${options[1].value} seconds.`);
        });
    },
};