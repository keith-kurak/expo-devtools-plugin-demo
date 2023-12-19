import { useState, useEffect, useCallback } from 'react';
import { useDevToolsPluginClient } from 'expo/devtools';

export const useExpoPluginHelloWorld = function() {
  const [message, setMessage] = useState(null);

  const client = useDevToolsPluginClient('expo-plugin-helloworld');

  useEffect(() => {
    const pingDisposer = client?.addMessageListener('ping', (data) => {
      client?.sendMessage('pong', { from: 'expo-plugin-helloworld' });
      alert(`ping from client: ${JSON.stringify(data)}`);
    });

    const pongDisposer = client?.addMessageListener('pong', (data) => {
      alert(`pong from client: ${JSON.stringify(data)}`);
    });

    // Set some message data
    addMessageListenerAsync('update', (data) => {
      setMessage(data);
    });

    return function cleanup() {
      pingDisposer?.remove();
      pongDisposer?.remove();
    }

  }, [ client ]);

  const sendPing = useCallback((message) => {
    client?.sendMessage('ping', message);
  }, [ client ]);

  return { message, sendPing }
}
