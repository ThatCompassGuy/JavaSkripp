const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Removes a user\'s timeout.')
        .addMentionableOption((option) =>
            option
                .setName('member')
                .setDescription('The member to untimeout.')
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
            if (!member.isCommunicationDisabled()) {
                await interaction.reply(`${member.user.username} is not timed out!`);
            }
            member.timeout(null, options[1]?.value);

            await interaction.reply(`${member.user.username} has had their timeout removed!`);
        });
    },
};