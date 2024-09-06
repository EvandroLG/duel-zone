import { useEffect, useRef, useState } from 'react';

function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket opened');
    };

    ws.current.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return message;
}

export default useWebSocket;
