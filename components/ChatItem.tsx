import Styles from "./Styles";
import React, { useEffect, useState } from "react";
import {View, Text, TextInput, Button, FlatList, ListRenderItem,Image, Animated, Easing } from "react-native";

interface ChatItem{
    id: string;
    text: string;
    image: string;
    timeStamp: number;
    by: string;
}

interface Props{
    chatItem: ChatItem;
    username: string;
}

const RenderChatItem = ({chatItem, username}: Props)=>{
    let unknownAvatarImage = "";
    let avatarImage = chatItem.image ?? unknownAvatarImage;

    let [animatedValue] = useState(new Animated.Value(0));
    useEffect(()=>{
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 400,
            easing: (number) => Easing.ease(number),
            useNativeDriver: true,
        }).start();
    });

    return (
        <Animated.View style={[
            Styles.flatListItem, {borderColor: username == chatItem.by ? "green" : "blue"},
            {opacity: animatedValue},
            {transform: [{scale: animatedValue}]}
        ]}
        >
            <View style={Styles.chatItemHeader}>
                <Image 
                source={{
                    uri: "data:image/jpeg;base64,"+avatarImage,
                }}
                style={Styles.avatarSmall}/>
            </View>
            <View>
            <Text style={Styles.smallItalicText}>
                {chatItem.by} at {new Date(chatItem.timeStamp).toLocaleTimeString()}
            </Text>
        </View>
        <Text style={Styles.chatText} > {chatItem.text}</Text>
        </Animated.View>
    )

} 

export {ChatItem, RenderChatItem};