module.exports = {
    data: {
        name: 'help',
    },
    async execute(message, args) {
        try {
            const devUser = await message.client.users.fetch('685552160594723015').catch(() => null);
            
            await message.reply({
                embeds: [{
                    color: 0x0099FF,
                    title: '📖 Commandes disponibles',
                    author: devUser ? {
                        name: `Kyoto Sanction - ${devUser.username}`,
                        icon_url: devUser.displayAvatarURL(),
                        url: `https://discord.com/users/685552160594723015`,
                    } : {
                        name: 'Kyoto Sanction',
                    },
                    fields: [
                        {
                            name: '🔇 &mute @user <durée> [raison]',
                            value: 'Mute un utilisateur avec un rôle (max 1h)\nFormats: `10m`, `30m`, `1h`\nExemple: `&mute @user 30m Spam`\n**Permissions:** Staff, Whitelist, Semi-whitelist, High rank, Full permissions',
                            inline: false,
                        },
                        {
                            name: '⏱️ &timeout @user <durée> [raison]',
                            value: 'Applique un timeout Discord (max 10min)\nFormats: `1m`, `5m`, `10m`\nExemple: `&timeout @user 5m Insultes`\n**Permissions:** Staff, Whitelist, High rank, Full permissions',
                            inline: false,
                        },
                        {
                            name: '🔓 &unmute @user',
                            value: 'Retire le mute d\'un utilisateur\n**Permissions:** Staff, Whitelist, High rank, Full permissions',
                            inline: false,
                        },
                        {
                            name: '🔓 &untimeout @user',
                            value: 'Retire le timeout d\'un utilisateur\n**Permissions:** Staff, Whitelist, High rank, Full permissions',
                            inline: false,
                        },
                        {
                            name: '⚙️ Gestion des Whitelists',
                            value: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                            inline: false,
                        },
                        {
                            name: '✅ &wladd @role',
                            value: 'Ajoute un rôle à la whitelist (permet toutes les sanctions)\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '❌ &wlremove @role',
                            value: 'Retire un rôle de la whitelist\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '📋 &wllist',
                            value: 'Affiche la liste des rôles dans la whitelist\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '✅ &semiwladd @role',
                            value: 'Ajoute un rôle à la semi-whitelist (mute uniquement)\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '❌ &semiwlremove @role',
                            value: 'Retire un rôle de la semi-whitelist\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '📋 &semiwllist',
                            value: 'Affiche la liste des rôles dans la semi-whitelist\n**Permissions:** Staff, Admin role (setadmin), Full permissions',
                            inline: false,
                        },
                        {
                            name: '👑 &setadmin @role',
                            value: 'Définit un rôle admin pour gérer les whitelists\nTous les rôles au-dessus peuvent aussi gérer les whitelists\n**Permissions:** Owner, Admin, Full permissions',
                            inline: false,
                        },
                        {
                            name: 'ℹ️ Notes importantes',
                            value: '• **Staff** = ModerateMembers ou Administrator\n• **High rank** = Rôles au-dessus du rôle configuré\n• **Whitelist** = Rôles ajoutés avec &wladd\n• **Semi-whitelist** = Rôles ajoutés avec &semiwladd (mute uniquement)\n• Les commandes de sanctions sont limitées au channel punitions sauf pour les high rank',
                            inline: false,
                        },
                    ],
                    footer: {
                        text: devUser ? `By ${devUser.tag} (${devUser.id})` : 'By 0xRynal',
                    },
                    timestamp: new Date().toISOString(),
                }],
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage de l\'aide:', error);
            message.reply('❌ Une erreur s\'est produite lors de l\'affichage de l\'aide.');
        }
    },
};
