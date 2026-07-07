import dotenv from 'dotenv';

dotenv.config();

export function getBackendPort() {
  return Number(process.env.PORT || 5000);
}

export function getBotPort() {
  return Number(process.env.BOT_PORT || 3001);
}

export function getApiBaseUrl() {
  return process.env.AGENT_API_URL || `http://localhost:${getBackendPort()}`;
}

export function getBotApiBaseUrl() {
  return process.env.BOT_API_URL || `http://localhost:${getBotPort()}`;
}
