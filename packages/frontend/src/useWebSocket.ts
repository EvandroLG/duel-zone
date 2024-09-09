import { useEffect, useState, useRef } from 'react';

type WebSocketMessage = {
  type: string;
  data: unknown;
};

const URL = 'ws://localhost:3000';

function useWebSocket() {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(URL);
    wsRef.current = ws;

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
    };

    return () => {
      ws?.close();
    };
  }, []);

  const sendMessage = (message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { lastMessage, sendMessage };
}

export default useWebSocket;
