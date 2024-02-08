import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { getUser } from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PollCommentItem from '../PollCommentItem/index'
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Value, timing } = Animated;

const PollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValues, setAnimationValues] = useState([]);
  const [pollItems, setPollItems] = useState([]);
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollComments, setNumOfPollComment] = useState('500');
  const [numOfPollLikes, setNumOfPollLikes] = useState('0');
  const [isLikeCommentIconClicked, setIsLikeCommentIconClicked] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);

 

// Inside your component

const optionContainerRef = useRef(null);




  const commentsData = [
    {
      id: 1,
      username: 'User1',
      comment: 'This is a great comment.',
      likes: 10,
      replies: 5,
    },
    {
      id: 2,
      username: 'User2',
      comment: 'I really enjoyed reading this.',
      likes: 15,
      replies: 3,
    },
    {
      id: 3,
      username: 'User3',
      comment: 'Interesting perspective.',
      likes: 8,
      replies: 2,
    },
    {
      id: 4,
      username: 'User4',
      comment: 'Awesome conversation!',
      likes: 20,
      replies: 7,
    },
    {
      id: 5,
      username: 'User5',
      comment: 'No woman no cry, me say you don know',
      likes: 12,
      replies: 4,
    },
  ];
   
  const toggleComments = () => {
    setCommentsVisible(!isCommentsVisible);
    // Set static comments data when the comments are made visible
    if (!isCommentsVisible) {
      setComments(commentsData);
    } else {
      setComments([]); // Reset comments when hiding the comments
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <PollCommentItem comment={item} />
    </View>
  );

  useEffect(() => {
    console.log(poll)
    setNumOfPollLikes(poll.numOfLikes);
    setNumOfPollComment(commentsData.length)
    setTotalNumOfVotes(poll.totalNumOfVotes || 0);
    try {
      const parsedPollItems = JSON.parse(poll.pollItems || '[]'); // Parse the string
      setPollItems(parsedPollItems);

      const initialAnimationValues = parsedPollItems.map(() => new Value(0));
      setAnimationValues(initialAnimationValues);

      setSelectedOption(null);
      const initialSelectedOption = parsedPollItems[0];
      console.log('Parsed Poll Items:', parsedPollItems);
      console.log('Initial Animation Values:', initialAnimationValues);
  
      console.log('Initial Selected Option:', initialSelectedOption);
      console.log('Initial Selected Option Votes:', initialSelectedOption.votes);
      console.log('Total Votes:', poll.totalNumOfVotes);
      animateVotePercentage(
        initialSelectedOption.votes / poll.totalNumOfVotes || 0,
        0
      );
    } catch (error) {
      console.log('Error parsing poll items:', error);
    }
  }, [poll]);

  useEffect(() => {
    if (selectedOption !== null) { 
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  }, [selectedOption]);  

  const handleOptionPress = (index) => {
    console.log("the initial selected option is: ", isOptionSelected);
  
    // Increment the votes for the selected option
    const updatedPollItems = [...pollItems];
    updatedPollItems[index].votes += 1;
  
    setPollItems(updatedPollItems);
  
    const newTotalNumOfVotes = totalNumOfVotes + 1;
    console.log("New total number of votes:", newTotalNumOfVotes);
    setTotalNumOfVotes(newTotalNumOfVotes);
    setSelectedOption(index);
    console.log("the post isSelectedOption is: ", isOptionSelected);
    animateAllOptions(index);
  };


  const animateVotePercentage = (percentage, index, isSelected) => {
    if (!isNaN(percentage)) {
      timing(animationValues[index], {
        toValue: percentage, // Use the calculated percentage directly
        duration: 600,
        easing: EasingNode.inOut(EasingNode.ease),
      }).start();
    } else {
      console.log('Invalid percentage value:', percentage);
    }
  };
  

  const animateAllOptions = (selectedOptionIndex) => {
    pollItems.forEach((pollItem, i) => {
      const percentage = calculatePercentage(pollItem.votes, totalNumOfVotes);
      animateVotePercentage(percentage, i, i === selectedOptionIndex);
    });
  };
  

  const calculatePercentage = (votes, totalVotes) => {
    console.log(`Votes: ${votes}, Total Votes: ${totalVotes}`);
    return totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  };
  const handleLickedIconClick = () => {
    setIsLikeCommentIconClicked(!isLikeCommentIconClicked);
    setNumOfPollLikes(prevLikes => (isLikeCommentIconClicked ? prevLikes +1 : prevLikes -1));

  };

  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode="contain"
          style={styles.userImage}
        />
      </View>
      <TouchableOpacity style={styles.userName}>
        <Text style={styles.userNameText}>{pollCreator}</Text>
      </TouchableOpacity>
       <Text style={styles.question}>{poll.pollCaption}</Text>
      <TouchableOpacity>
        <FlatList
          data={pollItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View>
            <View>
          {/* this is what I want to change the text color */}
          <Text style={{
          fontSize: 16,
          marginBottom: 12,
          fontWeight: '700',
          marginLeft: 125,
          color: isOptionSelected ? "black" : "#D8E8F3",
          }}>{item.title}</Text> 
        </View>
          <TouchableOpacity
          style={[
            styles.optionContainer,
            selectedOption === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}
        >
          <View>
            {!isOptionSelected && (
              <Text style={styles.optionText}>{item.title}</Text>
            )}
            <Animated.View
              style={[
                styles.percentageBar,
                {
                  width: animationValues[index].interpolate({
                    inputRange: [0, 10],
                    outputRange: ['0%', '60%'],
                  }),
                },
              ]}
            />
          </View>
          
          {isOptionSelected && (
            <Text style={styles.percentageText}>
            {`${calculatePercentage(item.votes, poll.totalNumOfVotes).toFixed(2)}%`}
          </Text>
            )}
        </TouchableOpacity>

                </View>
              )}
            />
      </TouchableOpacity>

      {/* component holding for the comment icon */}
      <TouchableOpacity
        style={styles.pollCommentContainer}
        onPress={toggleComments}
      >
        <FontAwesome
          name="commenting-o"
          size={35}
          color="#black"
          style={styles.pollCommentIcon}
        />
      </TouchableOpacity>
      <View
      style={{marginLeft:5}}
      >
      <Text style={styles.numOfpollComments}>{numOfPollComments}</Text>
      </View>
      <TouchableOpacity
        style={styles.pollLikesContainer}
        onPress={handleLickedIconClick}
      >
        <FontAwesome
          name={isLikeCommentIconClicked ? 'heart-o' : 'heart'}
          size={36}
          color={isLikeCommentIconClicked ? '#1764EF' : 'red'}
          style={styles.pollCommentIcon}
        />
        <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>
      </TouchableOpacity>

      {/* Comments Section */}
      <View style={{ height: isCommentsVisible ? 'auto' : 0, overflow: 'hidden' }}>
        <Text style={styles.numOfCommentsText}>{comments.length} Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#D8E8F3",
    marginTop:20,
    borderWidth: 5,
    borderRadius: 29,
    marginVertical:135
  },
  userImageContainer:{
    //marginStart:10,
    marginTop:-20,
    marginLeft: -10
   },
   userImage:{
       width:50,
       height:70
   },
   userName:{
   marginLeft: 0,
   marginTop:-45,
   marginBottom:50
   },
   userNameText:{
   fontSize:19,
   fontWeight:'200',
   marginLeft: 40
   },
  question: {
    fontSize: 19.5,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: -25
    
  },
  optionContainer: {
    marginBottom: 16,
    padding: 10,
    //borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 28,
    backgroundColor:'#ffff',
    height: 50
  },
  selectedOption: {
   backgroundColor: '#add8e6', // Light blue for selected option
   //backgroundColor: '#1764EF'
  },
  optionText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight:'700',
    marginLeft:125,
    color: "black"
  },
  selectedOptionText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight:'700',
    marginLeft:125,
    color: "#D8E8F3"
  },
 percentageBar: {
  height: 50,
  backgroundColor: '#1764EF', // Medium aquamarine for the percentage bar
  borderRadius: 29,
  width: '10%', // Set the width to 60% of the option container
  alignSelf: 'flex-start', // Align the percentage bar to the start of the container
  marginBottom: 4,
  marginTop: -10,
  marginLeft: -10,
  overflow: 'hidden', // Hide any overflow beyond the option container
},
  percentageText: {
    fontSize: 15,
    color: 'white',
    fontWeight:'600',
    marginTop: -36,
    marginLeft:20
  },
  pollCommentContainer:{
   marginTop:20,
  },
  pollCommentIcon:{
   marginLeft:20,
  },
  numOfpollComments:{
    fontSize: 15,
    marginLeft:12,
    marginTop:5,
   // fontWeight:'400'
  },
  pollLikesContainer:{
    marginLeft:280,
    marginTop:-65
  },
  numOfpollLikes:{
    marginLeft:20,
    marginTop:5,
    fontSize:20,
    fontWeight:'700'
  },
  pollCommentContainer: {
    marginTop: 20,
  },
  pollCommentIcon: {
    marginLeft: 20,
  },
  numOfpollComments: {
    fontSize: 19,
    marginLeft: 18,
    marginTop: 5,
    fontWeight: '700',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity
  },
  commentItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  numOfCommentsText: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    marginLeft: 100,
    marginTop: 20
    //color: '#1764EF', // Adjust the color based on your design
  },
});

export default PollListItem;
