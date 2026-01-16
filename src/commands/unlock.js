const { PermissionFlagsBits } = require('discord.js');
const config = require('../config');

module.exports = {
    data: {
        name: 'unlock',
    },
    async execute(message, args) {
        const { hasWhitelistedRole, hasFullPermissions, isHighRank } = require('../utils/whitelist');
        const { getRandomNoPermission, getRandomWrongChannel, getRandomBotPermission, getRandomError } = require('../utils/messages');
        
        const hasFullPerms = hasFullPermissions(message.author.id);
        const hasPermission = message.member.permissions.has([PermissionFlagsBits.ManageChannels, PermissionFlagsBits.Administrator]);
        const hasWhitelist = hasWhitelistedRole(message.member);
        const isHighRankMember = isHighRank(message.member) || hasFullPerms;
        const isStaff = hasPermission || hasWhitelist || hasFullPerms;
        
        if (!isStaff) {
            return message.reply(getRandomNoPermission('unlock', false));
        }

        if (!isHighRankMember && message.channel.name !== config.punitionsChannelName) {
            return message.reply(getRandomWrongChannel('unlock'));
        }

        try {
            if (!message.guild.members.me.permissions.has([PermissionFlagsBits.ManageChannels])) {
                return message.reply(getRandomBotPermission());
            }

            const everyoneRole = message.guild.roles.everyone;
            
            await message.channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: true,
            }, { reason: `Channel déverrouillé par ${message.author.tag}` });

            await message.reply(`🔓 Le channel a été déverrouillé.`);

            if (config.logChannelId) {
                const logChannel = message.guild.channels.cache.get(config.logChannelId);
                if (logChannel) {
                    try {
                        await logChannel.send({
                            embeds: [{
                                color: 0x00FF00,
                                title: '🔓 Channel Déverrouillé',
                                fields: [
                                    { name: 'Channel', value: `${message.channel}`, inline: true },
                                    { name: 'Par', value: `${message.author} (${message.author.tag})`, inline: true },
                                ],
                                timestamp: new Date().toISOString(),
                            }],
                        });
                    } catch (error) {
                        console.error('Erreur lors de l\'envoi du log:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'unlock:', error);
            message.reply(getRandomError());
        }
    },
};
