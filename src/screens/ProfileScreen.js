  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  import SwayingScreen from './SwayingScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import MySquadScreen from './MySquadScreen'
  import React from 'react'
const Tab = createMaterialTopTabNavigator()
const Profile = () => {
  return (
    <><KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={[styles.squadLogoContainer, { flexDirection: 'column' }]}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
          style={styles.squadLogo}
          resizeMode='contain'
        ></Image>
      </View>
    </KeyboardAvoidingView><Tab.Navigator
      style={[{ marginTop: -620 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
      screenOptions={{
        tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#F4F8FB" },
      }}
    >
        <Tab.Screen
          name="Polls "
          component={PersonalPollScreen} />
        <Tab.Screen name="Squad" component={MySquadScreen} />
        <Tab.Screen name="Swaying" component={SwayingScreen} />
      </Tab.Navigator></>
  )
}

export default Profile
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",


  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70  
  }
})

