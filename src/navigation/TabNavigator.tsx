import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import colors from "@utils/colors"
import Home from "@views/auth/Home"
import Profile from "@views/auth/Profile"
import Upload from "@views/auth/Upload"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileNavigator from "./ProfileNavigator"

const Tab = createBottomTabNavigator()

const TabNavigator = () =>{ 
    return <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: colors.PRIMARY
        }
    }}>
        <Tab.Screen name="HomeScreen" component={Home} options={{
            tabBarIcon: (props) =>{
                return <AntDesign name="home" size={props.size} color={props.color}/>
            }, 
            tabBarLabel: 'Home'
        }}
        />
        <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{
            tabBarIcon: (props) =>{
                return <AntDesign name="user" size={props.size} color={props.color}/>
            },
            tabBarLabel: 'Profile'
        }}
        />
        <Tab.Screen name="UploadScreen" component={Upload} options={{
            tabBarIcon: (props) =>{
                return <MaterialCommunityIcon name="account-music-outline" size={props.size} color={props.color}/>
            },
            tabBarLabel: 'Upload'
        }}
        />
    </Tab.Navigator>
}

export default TabNavigator;