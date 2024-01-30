import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@views/auth/Profile';
import ProfileSettings from '@components/profile/ProfileSettings';
import Verification from '@views/auth/Verification';
import { HomeNavigationStackParamList } from '@src/@types/navigation';
import PublicProfile from '@views/PublicProfile';
import Home from '@views/auth/Home';

const Stack = createNativeStackNavigator<HomeNavigationStackParamList>()

interface Props {}

const HomeNavigator: FC<Props> = (props) =>{
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='PublicProfile' component={PublicProfile} />
    </Stack.Navigator>
};

const styles = StyleSheet.create({
    container: { }
  });

export default HomeNavigator;