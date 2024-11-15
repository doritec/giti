// Mock email service with Discord integration
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1290064859018428466/_qS1U4H3wEyLE4PE0edFtOYc-24ER73KWwIRSuUKN9joNIMXXEiyA1qAmn3GT8ZuKtwh'; // Replace with your webhook URL

import { sendDiscordNotification } from './notificationService';

export const sendRecoveryEmail = async (userEmail: string, username: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Send notification to Discord
  await sendDiscordNotification(DISCORD_WEBHOOK_URL, {
    email: userEmail,
    username: username
  });

  // Log the recovery attempt (for demonstration)
  console.log('Recovery email would be sent to:', {
    to: 'artisticwonder123@gmail.com',
    subject: 'Account Recovery Request',
    username,
    userEmail
  });

  return true;
};