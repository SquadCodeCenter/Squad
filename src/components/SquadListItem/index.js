import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
//import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const SquadListItem =({ squad,
  userInfo,
  onPress = () => {},
  selectable = false,
  isSelected = false,})=>{
 const navigation = useNavigation()
 const[squadSelected, setSquadSelected] = useState(false)
 const [userSquadsJoinedArray, setUserSquadsJoinedArray] = useState([])


useEffect(() => {
  const fetchParentSquadJoinedArray = async () => {
    if (userInfo) {
      //console.log("we have userInfo data",userInfo.squadJoined);
      setUserSquadsJoinedArray(userInfo.squadJoined)
       //setSquadToBeJoined(userInfo.userSquadId); // Access userSquadId directly
     }
    }
    fetchParentSquadJoinedArray()
}, []);
//add the squad selected to the user's joined squad array
const handleSquadSelected=async() =>{
  //console.log(squad)
  console.log(userInfo)
  if(squadSelected==false){
    setSquadSelected(true)
    userSquadsJoinedArray.push(squad.id)
  }else{
    setSquadSelected(false)
  }
}
 
 return (
   <Pressable
   style={styles.container}
   behavior="padding"
   >
  <View
   style={styles.userImageContainer}
  >
  <FontAwesome name="group" size={34} color="#1145FD" style={{marginTop:-25}}/>
  </View>
  <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
   <View
   style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
   >
       <Text
        style = {styles.squadNameText}
       > 
       {squad?.squadName}
       </Text>
       <Text
       style = {styles.squadCreator}
       >
         Created by {squad?.authUserID}
       </Text>
     </View>
     <TouchableOpacity
          style={[
            { justifyContent: "flex-end" },
            { alignItems: "center" },
            squadSelected ? styles.joinedSquadTextContainer : styles.joinSquadTextContainer, // Add this condition
          ]}
          onPress={handleSquadSelected}
        >
        <Text style={{ color: squadSelected ? "#1145FD" : "white", marginBottom: 10 }}>
            {squadSelected ? "Joined!" : "Join Squad"}
          </Text>
        </TouchableOpacity>
  </View>
   </Pressable>
 )
 }

 
 const styles = StyleSheet.create({
 container:{
 flex:1,
 flexDirection: "row",
 marginHorizontal: 10,
 marginTop: 20,
 //marginVertical: 65,
 borderColor: "#FFFF",
 //height: 100,
 borderRadius: 15,
 backgroundColor: "white",
 borderWidth: 5,
 marginRight:30
},
 pollCaptionContainer:{
   height: 50,
   width: 180,
 },
 joinSquadTextContainer:{
  height:40,
  width: 95,
  backgroundColor: "#1145FD",
  borderRadius: 10,
  borderColor: "#FFFF",
  borderWidth: 2.5,
  marginLeft:25,
  marginTop:-25
  
 },
 joinedSquadTextContainer:{
  height:40,
  width: 95,
  backgroundColor: "#FFFF",
  borderRadius: 10,
  borderColor:"#1145FD",
  borderWidth: 2.5,
  marginLeft:25,
  marginTop:-25
 },
 
 pollCaptionContainer:{
   height: 50,
   width: 180,
 },
 numOfVotesContainer:{
  height:40,
  width: 95,
  backgroundColor: "#1145FD",
  borderRadius: 10,
  borderColor: "#FFFF",
  borderWidth: 2.5,
  marginLeft:5,
  
 },
 votedText:{
   color: "white",
   fontWeight: "bold",
   marginBottom:7,
   marginLeft:1,
   fontSize: 8.5,
   textAlignVertical:'center'
 }, 
 userImageContainer:{
  marginStart:10,
  marginTop:50
 },
 userImage:{
     width:50,
     height:70
 },
squadNameText:{
 fontWeight:'500',
 marginLeft:5,
 marginTop:-40
},
squadCreator:{
 marginTop: 15,
 marginLeft: 5,
 color: '#545454',
 fontSize:10
}
 },
 )
export default SquadListItem;