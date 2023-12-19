import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connectPluginFromDevToolsAsync } from 'expo/devtools';
import { useExpoPluginHelloWorld } from 'expo-plugin-helloworld';

export default function App() {
  const { message, sendPing } = useExpoPluginHelloWorld();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginBottom: 50 }}>Hello world plugin!</Text>
      {message ? (
        <Text>{JSON.stringify(message)}</Text>
      ) : (
        <Text>Waiting for counter state change...</Text>
      )}
      <View style={{ marginTop: 20 }} />
      <Button
        title="Ping client"
        onPress={() => sendPing({ from: 'expo-plugin-helloworld/button' })}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
