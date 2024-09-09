import { useEffect, useState } from 'react';

type WebSocketMessage = {
  type: string;
  data: unknown;
};

const URL = 'ws://localhost:3000';
let ws: WebSocket | null = null;

function useWebSocket() {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  useEffect(() => {
    console.log('useEffect: Setting up WebSocket connection');

    if (!ws) {
      console.log('Connecting to WebSocket:', URL);

      ws = new WebSocket(URL);

      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (e) => {
        console.log('WebSocket message:', e.data);
        const message = JSON.parse(e.data) as WebSocketMessage;
        setLastMessage(message);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        ws = null;
      };
    }

    return () => {
      if (ws) {
        console.log('Cleaning up WebSocket connection');
        ws.close();
        ws = null;
      }
    };
  }, []);

  const sendMessage = (message: object) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return { lastMessage, sendMessage };
}

export default useWebSocket;
