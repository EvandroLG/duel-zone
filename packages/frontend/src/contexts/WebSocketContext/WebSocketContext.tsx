import { createContext, useRef, useEffect, useState } from 'react';

type WebSocketMessage = {
  type: string;
  data: unknown;
};

type WebSocketContextType = {
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: object) => void;
};

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

type WebSocketProviderProps = {
  url: string;
  children: React.ReactNode;
};

export function WebSocketProvider({ url, children }: WebSocketProviderProps) {
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log('useEffect: Setting up WebSocket connection');
    const ws = new WebSocket(url);

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
  }, [url]);

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
