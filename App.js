    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, Text, View } from 'react-native';
    import { NavigationContainer } from '@react-navigation/native';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import LoginScreen from './src/screens/LoginScreen';
    import HomeScreen from './src/screens/HomeScreen';
    import SignupScreen from './src/screens/SignupScreen';
    import SquadCreationScreen from './src/screens/SquadCreationScreen';
    import PhoneOTPScreen from './src/screens/PhoneOTPScreen';
    import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
    import EmailOTPScreen from './src/screens/EmailOTPScreen';
    import AgeGenderLocationScreen from './src/screens/AgeGenderLocationScreen';
    import PersonalInterests from './src/screens/PersonalInterests';
    import ProfilePictureUpload from './src/screens/ProfilePictureUpload';
    import GoogleSignInLoadingScreen from './src/screens/GoogleSignInLoadingScreen';
    import UploadProfPicture from './src/screens/UploadProfPictureScreen';
    import ChangeProfilePictureScreen from './src/screens/ChangeProfilePictureScreen';
    import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
    import { Ionicons } from "@expo/vector-icons";
    import { createAppContainer } from "react-navigation";
    import { createBottomTabNavigator } from "react-navigation-tabs";
    import PollCreation from './src/screens/PollCreationScreen';
    import PollRequest from './src/screens/PollRequestScreen';
    import Profile from './src/screens/ProfileScreen';
    import NotificationScreen from './src/screens/NotificationScreen';
      
    //this is the create stack navigator method: src from the navigation docs on the internet
    const Stack = createNativeStackNavigator();
    const TabNavigator = createBottomTabNavigator({
      Home: {
          screen: HomeScreen, 
          navigationOptions: {
            tabBarLabel: "User",
            tabBarOptions: {
              activeTintColor: "#006600",
            },
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="md-person-circle-outline"
                  size={24}
                  color={tabInfo.focused ? "#006600" : "#8e8e93"}
                />
              );
            },
          },
        },
    PollRequest: {
      screen: PollRequest,
      navigationOptions: {
        tabBarLabel: "User",
        tabBarOptions: {
          activeTintColor: "#006600",
        },
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-person-circle-outline"
              size={24}
              color={tabInfo.focused ? "#006600" : "#8e8e93"}
            />
          );
        },
      },
    },
    PollCreation: {
      screen: PollCreation,
      navigationOptions: {
        tabBarLabel: "User",
        tabBarOptions: {
          activeTintColor: "#006600",
        },
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-person-circle-outline"
              size={24}
              color={tabInfo.focused ? "#006600" : "#8e8e93"}
            />
          );
        },
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarLabel: "User",
        tabBarOptions: {
          activeTintColor: "#006600",
        },
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-person-circle-outline"
              size={24}
              color={tabInfo.focused ? "#006600" : "#8e8e93"}
            />
          );
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarOptions: {
          activeTintColor: "#006600",
        },
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="md-settings-outline"
              size={24}
              color={tabInfo.focused ? "#006600" : "#8e8e93"}
            />
          );
        },
      },
    },
  });
    
const Navigator = createAppContainer(TabNavigator);
function HomeScreenBottonNavigator (){
  return(
    <Navigator>
       <HomeScreen />
    </Navigator>


  )
}
    export default function App() {
      return (
        <NavigationContainer>
          <Stack.Navigator>
          {/*<Stack.Screen name="Home"component={HomeScreen}options={{ title: 'Welcome' }}/>*/}
            <Stack.Screen options={{headerShown : false}}   name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreenBottomNavigator" component={HomeScreenBottonNavigator} />
            <Stack.Screen options={{headerShown: false}} name="SignupScreen"  component={SignupScreen} />
            <Stack.Screen options={{headerShown: false}} name="SquadCreationScreen"  component={SquadCreationScreen} />
            <Stack.Screen options={{headerShown: false}} name="PhoneOTPScreen"  component={ PhoneOTPScreen} />
            <Stack.Screen options={{headerShown: false}} name="EmailOTPScreen"  component={EmailOTPScreen} />
            <Stack.Screen options={{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen options={{headerShown: false}} name="AgeGenderLocationScreen" component={AgeGenderLocationScreen}/>
            <Stack.Screen options={{headerShown: false}} name="GoogleSignInLoading" component={GoogleSignInLoadingScreen}/>
            <Stack.Screen options={{headerShown: false}} name="PersonalInterestScreen" component={PersonalInterests}/>
            <Stack.Screen options={{headerShown: false}} name="ProfilePictureUploadScreen" component={ProfilePictureUpload}/>
            <Stack.Screen options={{headerShown: false}} name="UploadProfPictureScreen" component={UploadProfPicture}/>
            <Stack.Screen options={{headerShown: false}} name="ChangeProfilePictureScreen" component={ChangeProfilePictureScreen}/>
            <Stack.Screen options={{headerShown: false}} name="PhoneNumberScreen" component={PhoneNumberScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F4F8FB',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
