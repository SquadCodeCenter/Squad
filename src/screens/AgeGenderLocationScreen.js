        import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
        StatusBar,Dimensions,TouchableOpacity, TextInput, Alert} from 'react-native'
        import React, { useState } from 'react'
        import StepIndicator from 'react-native-step-indicator';
        import { Input } from 'react-native-elements'
        import { useNavigation } from '@react-navigation/core';
        import SelectList from 'react-native-dropdown-select-list';
        import DatePicker from 'react-native-datepicker';
        import { useEffect } from 'react';
        import * as Location from 'expo-location';
        import { Ionicons } from '@expo/vector-icons';
        //import {Location, Permission} from 'expo'
        import { auth } from '../firebase';
        import 'firebase/firestore';
        import firebase from '../firebase';
        

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
      const dataGender  = [
        {key:'1', value:"Agender"},
        {key:'1', value:"Androgyne"},
        {key:'1', value:"Androgynous"},
        {key:'1', value:"Bigender"},
        {key:'1', value:"Cis"},
        {key:'1', value:"Cisgender"},
        {key:'1', value:"Cis Female"},
        {key:'1', value:"Cis Male"},
        {key:'1', value:"Cis Man"},
        {key:'1', value:"Cis Woman"},
        {key:'1', value:"Cisgender Female"},
        {key:'1', value: " Cisgender Male"},
        { key:'1', value: "Cisgender Man"},
        {key:'1', value: "Cisgender Woman"},
        {key:'1', value:" Female to Male"},
        {key:'1', value:"FTM"},
        {key:'1', value:"Gender Fluid"},
        {key:'1', value: "Gender Nonconforming"},
        {key:'1', value: "Gender Questioning"},
        {key:'1', value: "Gender Variant"},
        { key:'1', value: "Genderqueer"},
        {key:'1', value: "Intersex"},
        {key:'1', value:"Male to Female"},
        {key:'1', value: "MTF"},
        {key:'1', value: "Neither"},
        {key:'1', value: "Neutrois"},
        {key:'1', value: "Non-binary"},
        {key:'1', value: "Other"},
        {key:'1', value:"Pangender"},
        { key:'1', value:"Trans"},
        {key:'1', value: "Trans*"},
        {key:'1', value:  "Trans Female"},
        {key:'1', value: "Trans* Female"},
        {key:'1', value:"Trans Male"},
        {key:'1', value:"Trans* Male"},
        {key:'1', value:"Trans Man"},
        {key:'1', value:"Trans* Man"},
        { key:'1', value: "Trans Person"},
        {key:'1', value: "Trans* Person"},
        {key:'1', value:"Trans Woman"},
        {key:'1', value: "Trans* Woman"},
        {key:'1', value: "Transfeminine"},
        {key:'1', value: "Transgender"},
        {key:'1', value:"Transgender Female"},
        {key:'1', value:"Transgender Male"},
        { key:'1', value:"Transgender Man"},
        {key:'1', value:"Transgender Person"},
        {key:'1', value: "Transgender Woman"},
        {key:'1', value:"Transmasculine"},
        {key:'1', value: "Transsexual"},
        {key:'1', value: "Transsexual Female"},
        {key:'1', value:"Transsexual Male"},
        {key:'1', value: "Transsexual Man"},
        {key:'1', value:"Transsexual Person"},
        {key:'1', value:"Transsexual Woman"},
        {key:'1', value:"Two-Spirit"}
      ]

      const AgeGenderLocationScreen = () => {
        const[currentPosition, setCurrentPositon] = useState(0)
        const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
        const [selectedGender, setGenderSelected] =useState("");
        const [selectedDate, setSelectedDate] = useState("");
        //const [open, setOpen] = useState(false)
        const navigation = useNavigation()
        const [displayCurrentAddress, setDisplayCurrentAddress] = useState("");
        const user = firebase.auth().currentUser
        const CheckIfLocationEnabled = async () => {
          let enabled = await Location.hasServicesEnabledAsync();
      
          if (!enabled) {
            Alert.alert(
              'Location Service not enabled',
              'Please enable your location services to continue',
              [{ text: 'OK' }],
              { cancelable: false }
            );
          } else {
            setLocationServiceEnabled(enabled);
          }
        };

        const GetCurrentLocation = async () => {
          Alert.alert('getting current location')
          let { status } = await Location.requestBackgroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert(
              'Permission not granted',
              'Allow the app to use location service.',
              [{ text: 'OK' }],
              { cancelable: false }
            );
          }
        
          let { coords } = await Location.getCurrentPositionAsync();
        
          if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude
            });
        
            for (let item of response) {
              let address = `${item.street}, ${item.postalCode}, ${item.city}`;
        
              setDisplayCurrentAddress(address);
            }
          }
        };
        

        useEffect(() => {
          CheckIfLocationEnabled();
          GetCurrentLocation();
        }, []);
      
       
        const saveAgeGenderLocation =()=>{
          if(user){
          //find their info from the data base
          const firestore = firebase.firestore;
          const userRef = firestore().collection('users').doc(user.uid)
          //let's get the snapshot of the document 
          const snapShot = userRef.get()
          if(snapShot.exists){
            try {userRef.set({
              date,
              selectedGender,
              displayCurrentAddress,
            })
            } catch (error) {
              
            }

          }
        }
        navigation.replace('ProfilePictureUploadScreen')
        }
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
              <View style={[{marginLeft:10},{marginTop:2},{marginBottom:-5}]}>
                <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Date of Birth</Text>
              </View>
          
              <TouchableOpacity style={styles.passwordContainer}>
            <DatePicker
                style={{width: 200}}
                date={selectedDate}
                mode="date"
                //placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1922-05-01"
                maxDate="2007-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 250
                  },
                  dateInput: {
                    //marginLeft: -50,
                    alignItems:"flex-start",
                    height:50,
                    borderColor: '#EAEAEA',
                   color: '#535353' 
                  }
                  // ... You can check the source to find the other keys.
                }}
            onDateChange={date=> setSelectedDate(date)}/>
            </TouchableOpacity>
         
            
              <View style={[{marginLeft:10},{marginTop:-2},{marginBottom:5}]}>
                <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Gender</Text>
              </View>

              <SelectList 
                onSelect={() => (selectedGender)}
                placeholder="Select your gender"
                label="Gender"
                setSelected={setGenderSelected} 
                data={dataGender}  
                style={styles.input}
              //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
              // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
                search={true} 
                //maxHeight = '5'
                boxStyles={[{marginLeft:12}, {width:320},{marginBottom:15},{backgroundColor: '#EAEAEA'},{color:'#535353'}, {height:52}]} //override default styles
          />
              <View style={[{marginLeft:15},{marginTop:2},{marginBottom:-10}]}>
                <Text style={[{color:'#535353'},{fontWeight:"800"}]}>Location</Text>
              </View>

              <TouchableOpacity style={styles.passwordContainer}>
                      <TextInput
                          style={styles.inputStyle}
                          autoCorrect={false}
                          textAlign= 'left' 
                          placeholder="Enter Your Location"
                          placeholderTextColor={'#000'}
                          value={displayCurrentAddress}
                          onPressIn={GetCurrentLocation}
                        // onChangeText={this.onPasswordEntry}
                        />
                      <Ionicons
                      name="md-location-outline" 
                        color='#000'
                        size={36}
                      />
                    </TouchableOpacity>

              </View>


              <View style={[{ flexDirection:"row" },{marginTop:-60}, {marginLeft:25}]}>
              <TouchableOpacity  onPress={() =>navigation.replace('SignupScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
                  <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
                </TouchableOpacity>
                  <TouchableOpacity  onPress={saveAgeGenderLocation}style={[{flex:1}, styles.button]}>
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
          marginTop:70
        
      
      },
      header:{
        height: 55, 
        //padding:10, 
        width:'50%',
        //backgroundColor:"#000",
        //elevation:10,
        justifyContent:"center",
        alignItems:'center',
        marginRight:200,
        marginTop: 10,
        marginLeft:35
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
          //elevation:10,
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
        borderRadius:10,
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
          width: 180,
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
        width: 180,
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

      passwordContainer: {
        flexDirection: 'row',
        width:320,
        height:50,
        borderWidth: 1,
        borderColor: '#000',
        marginTop:20,
        marginLeft:10,
        marginBottom:10,
        overflow:'hidden',
        borderRadius:10,
        backgroundColor: '#EAEAEA',
        //borderColor: "red",
        paddingBottom: -3,
        paddingLeft:10
      },
      inputStyle: {
        flex: 1,
          color:'#535353'
      },

      })