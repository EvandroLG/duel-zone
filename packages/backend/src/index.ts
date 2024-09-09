import http from 'http';
import express from 'express';
import WebSocket from 'ws';

import { game } from './game';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const MAX_PLAYERS = 2;
const PORT = process.env.PORT || 3000;

let connectedPlayers = 0;

wss.on('connection', (ws) => {
  if (connectedPlayers >= MAX_PLAYERS) {
    ws.send(JSON.stringify({ type: 'error', data: 'Game is full' }));
    ws.close();
    return;
  }

  console.log('Client connected');

  connectedPlayers++;
  const playerId = game.addPlayer();
  ws.send(JSON.stringify({ type: 'playerId', data: playerId }));
  broadcastGameState();

  ws.on('message', (message: string) => {
    const { type, data } = JSON.parse(message);

    if (type === 'move') {
      game.updatePlayer(playerId, data);
      broadcastGameState();
      return;
    }
  });

  ws.on('close', () => {
    connectedPlayers--;
    console.log('Client disconnected');
    game.removePlayer(playerId);
    broadcastGameState();
  });
});

function broadcastGameState() {
  const state = game.getState();
  broadcast(JSON.stringify({ type: 'gameState', data: state }));
}

function broadcast(data: string) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
