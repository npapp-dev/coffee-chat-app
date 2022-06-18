import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chat from './components/Chat';
import PersonalInfo from './components/PersonalInfo';
import Styles from './components/Styles';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()
.then(result => {
  console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
})
.catch(console.warn);

export default function App() {
  const storageUserNameKey = "chatapp-username";
  const storageImageKey = "chatapp-image";
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");

  const fetchPersonalData = async () => {
    let fetchedUsername = await AsyncStorage.getItem(storageUserNameKey);
    let userName = fetchedUsername == null ? "" : fetchedUsername;
    let fetchedImage = await AsyncStorage.getItem(storageImageKey);
    let image = fetchedImage == null ? "" : fetchedImage;
    setUserName(userName);
    setImage(image);
    SplashScreen.hideAsync();
  };

  const onPersonalInfoClosed = async (name: string, image: string) => {
    setUserName(name);
    await AsyncStorage.setItem(storageUserNameKey, name);
    setImage(image);
    await AsyncStorage.setItem(storageImageKey, image);
  }
  
  fetchPersonalData();

  let activeComponent = username != "" ? (
    <Chat username={username} image={image} />
  ) : (
    <PersonalInfo onClosed={onPersonalInfoClosed} />
  )

  return (
    <SafeAreaView style={Styles.container}>
      {activeComponent}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

