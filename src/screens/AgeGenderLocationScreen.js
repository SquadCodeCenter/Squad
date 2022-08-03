  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import React, { useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  import { Input } from 'react-native-elements'
  import { useNavigation } from '@react-navigation/core';
   

//const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
const{width,height} = Dimensions.get("window")
//const[currentPosition, setCurrentPositon]=useState(0)
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2, 
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ffff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#ffff',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#ffff',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fff',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#1764EF',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fffff'
}

const gender = ["Agender",
  "Androgyne",
  "Androgynous",
  "Bigender",
  "Cis",
  "Cisgender",
  "Cis Female",
  "Cis Male",
  "Cis Man",
  "Cis Woman",
 "Cisgender Female",
 " Cisgender Male",
 "Cisgender Man",
  "Cisgender Woman",
 " Female to Male",
  "FTM",
  "Gender Fluid",
 "Gender Nonconforming",
  "Gender Questioning",
  "Gender Variant",
  "Genderqueer",
  "Intersex",
  "Male to Female",
  "MTF",
  "Neither",
  "Neutrois",
  "Non-binary",
  "Other",
  "Pangender",
  "Trans",
 "Trans*",
  "Trans Female",
  "Trans* Female",
  "Trans Male",
 "Trans* Male",
 "Trans Man",
 "Trans* Man",
  "Trans Person",
  "Trans* Person",
 "Trans Woman",
  "Trans* Woman",
  "Transfeminine",
  "Transgender",
  "Transgender Female",
  "Transgender Male",
  "Transgender Man",
  "Transgender Person",
  "Transgender Woman",
 "Transmasculine",
  "Transsexual",
  "Transsexual Female",
 "Transsexual Male",
  "Transsexual Man",
  "Transsexual Person",
  "Transsexual Woman",
  "Two-Spirit"
]

const AgeGenderLocationScreen = () => {
  const[currentPosition, setCurrentPositon] = useState(0)
  const navigation = useNavigation()
  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
        >
        <View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
            style={styles.squadLogo}
            resizeMode='contain'
          ></Image>
        </View>      
        <StatusBar backgroundColor={'black'} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerText}> Sign Up Progress</Text>
        </View>
        <View style={styles.indicatiorWindow}>
        <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         //labels={labels}
         />
        </View>  
        <TouchableOpacity>
        <View style={styles.InputContainer}>
         <Input
         placeholder='MM-DD-YYYY'
          //style={styles.input}
          label="Age"
          style={[styles.input, {marginRight:-10}]}
          underlineColor="transparent"
          inputContainerStyle={{borderBottomWidth:0}}
          rightIcon={{ type: 'font-awesome', name: 'calendar', height:40, backgroundColor:'#EAEAEA', width:40,marginTop:10, padding:5, color:'#535353', marginRight:10}}
         
         />
         <Input
         placeholder='Select your gender'
          label="Gender"
          style={[styles.input, {marginRight:-10}]}
          underlineColor="transparent"
          inputContainerStyle={{borderBottomWidth:0}}
          rightIcon={{ type: 'font-awesome', name: 'chevron-down', height:40, backgroundColor:'#EAEAEA', width:40,marginTop:10, padding:5, color:'#535353', marginRight:10}}
         
         />
         <Input
         placeholder='Enter your location'
          style={[styles.input, {marginRight:-10}]}
          label="Location"
          underlineColor="transparent"
          inputContainerStyle={{borderBottomWidth:0}}
          rightIcon={{ type: 'font-awesome', name: 'map-marker', height:40, backgroundColor:'#EAEAEA', width:40,marginTop:10, padding:5, color:'#535353', marginRight:10}} 
         />
        </View>
        <View style={[{ flexDirection:"row" },{marginTop:-30}]}>
        <TouchableOpacity  onPress={() =>navigation.replace('SignupScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
            <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
           </TouchableOpacity>
            <TouchableOpacity  onPress={() =>navigation.replace('ProfilePictureUploadScreen')}style={[{flex:1}, styles.button]}>
            <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
           </TouchableOpacity>
   </View>
   </TouchableOpacity>
  </KeyboardAvoidingView>
  )
}

export default AgeGenderLocationScreen

const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB"

  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:130
      


  },
  header:{
    height: 55, 
    padding:10, 
    width:'50%',
    //backgroundColor:"#000",
    elevation:10,
    justifyContent:"center",
    alignItems:'center',
    marginRight:200,
    marginTop: 20,
  },
  headerText:{
    //color:'red',
    fontSize:22,
    fontWeight:'bold'
  },
  indicatiorWindow:{
    //height:height-170,
    width:width-30,
    padding:20,
    margin:15,
    elevation:10,
    borderRadius:20,
    marginTop:-10
    //backgroundColor:'blue'
  },
  InputContainer:{
    width: 350,
    right: 16,
    marginLeft:29,
    marginTop: 20,
    borderRadius:5

},
input:{
  backgroundColor: '#EAEAEA',
  paddingHorizontal: 15,
  paddingVertical:10,
  borderRadius:5,
  width:320,
  height:42,
  marginTop:10,
  fontSize: 13,
  marginRight:15,
  marginLeft:-5,
  //fontFamily:"Montserrat-Regular",
  color:'#535353',
  fontWeight:'400' ,
  color:'black'  
},

  button:{
    backgroundColor: '#1145FD',
    width: 120,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 130,
    alignItems: 'center',
    marginRight: 50,
    marginLeft:15,

},

backButton:{
  backgroundColor: '#EAEAEA',
  width: 120,
  height: 42,
  padding: 10,
  borderRadius: 5,
  marginTop: 130,
  alignItems: 'center',
  marginRight: 5,
  marginLeft:15,
  borderColor:'#1145FD'


},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
backText:{
  color: '#1145FD',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},

})