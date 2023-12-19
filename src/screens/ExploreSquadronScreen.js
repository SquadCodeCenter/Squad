import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import SquadListItem from "../components/SquadListItem"
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listSquads } from '../graphql/queries';
import { useRoute } from '@react-navigation/native';


const ExploreSquadronScreen = () => { 
  //const [search, setSearch] = useState('');
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [squads, setSquads] = useState([])
  
  

  // get data from the fake api
  useEffect(() => {
    const fetchSquads = async () => {
      // const apiResponse = await fetch(
      //   "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      // );
      // const data = await apiResponse.json();
      // setFakeData(data);
      try {
        const results = await API.graphql(graphqlOperation(listSquads));
        if(!results.data?.listSquads){
          console.log("Error fetching users")
        }
        console.log("this is the list of the Squads",results.data.listSquads.items)
          setSquads(results.data?.listSquads?.items)
      } catch (error) {
        console.log(error)
      }
    };
    fetchSquads();
  }, []);

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setFilteredDataSource(responseJson);
  //       setMasterDataSource(responseJson);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = masterDataSource.filter(function (item) {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFilteredDataSource(masterDataSource);
  //     setSearch(text);
  //   }
  // };

  // const ItemView = ({ item }) => {
  //   return (
  //     // Flat List Item
  //     <Text style={styles.itemStyle} onPress={() => getItem(item)}>
  //       {item.id}
  //       {'.'}
  //       {item.title.toUpperCase()}
  //     </Text>
  //   );
  // };

  // const ItemSeparatorView = () => {
  //   return (
  //     // Flat List Item Separator
  //     <View
  //       style={{
  //         height: 0.5,
  //         width: '100%',
  //         backgroundColor: '#C8C8C8',
  //       }}
  //     />
  //   );
  // };

  // const getItem = (item) => {
  //   // Function for click on an item
  //   alert('Id : ' + item.id + ' Title : ' + item.title);
  // };

  return (
    <SafeAreaView
    style={styles.container}>
    <View style={styles.searchBarContainer}>
        <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {/* {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
      )} */}
       <FlatList
       data = {squads}
       renderItem={({item})=>(
        <SquadListItem
         squad={item}
        />
       )} 
       
       />

    </View>
     
    </SafeAreaView>
  )
}
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
},
searchBarContainer:{
marginTop:10,
marginLeft: 30,
width: 420
},
searchBar:{
  backgroundColor: 'white'
},
itemStyle: {
  padding: 10,
},
})
export default ExploreSquadronScreen