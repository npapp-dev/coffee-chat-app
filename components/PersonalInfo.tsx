import React, { useState } from "react";
import {View, TextInput, Button, Image, Text } from "react-native";
import Styles from "./Styles";

const PersonalInfo = () =>{
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    return (
        <View style={Styles.personalInfoContainer}>
                <Image
                 style={Styles.logo}
                 source={require("../assets/coffee-icon.png")}></Image>

                <View style={Styles.enterYourName}>
                    <Text style={Styles.nameText}>Please enter your name</Text>
                    <TextInput style={Styles.nameTextInput}/>
                </View>

                <Button title="Start chatting!" onPress={() => {}}/>
        </View>
    );
}

export default PersonalInfo;