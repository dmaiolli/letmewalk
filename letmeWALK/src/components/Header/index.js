import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


const Header = (props) => {
  return (
    <View style={{ backgroundColor: "#321D5F", flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', padding: 16 }}>
      <Icon onPress={() => props.navigation.goBack()} name="arrow-left" size={30} color="#4F8EF7" />
      <Image source={require("../../assets/HeaderTitle.png")} style={{ transform: [{ scale: 1.5 }] }} />
      <Button title='Teste' onPress={() => this.props.navigation.navigate('contatos')} />
    </View>
  )
}

export default Header;