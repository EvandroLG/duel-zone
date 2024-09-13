import { createContext, useRef, useContext, useEffect, useState } from 'react';

const URL = 'ws://localhost:3000';

type WebSocketMessage = {
  type: string;
  data: unknown;
};

type WebSocketContextType = {
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: object) => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider'
    );
  }

  return context;
}

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log('useEffect: Setting up WebSocket connection');
    const ws = new WebSocket(URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (e) => {
      console.log('WebSocket message:', e.data);
      setLastMessage(JSON.parse(e.data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    wsRef.current = ws;

    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, []);

  const sendMessage = (message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ lastMessage, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}
