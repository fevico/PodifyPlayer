import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@views/auth/Profile';
import ProfileSettings from '@components/profile/ProfileSettings';
import Verification from '@views/auth/Verification';
import { ProfileNavigationStackParamList } from '@src/@types/navigation';
import UpdateAudio from '@components/profile/UpdateAudio';

const Stack = createNativeStackNavigator<ProfileNavigationStackParamList>()

interface Props {}

const ProfileNavigator: FC<Props> = (props) =>{
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
        <Stack.Screen name='Verification' component={Verification} />
        <Stack.Screen name='UpdateAudio' component={UpdateAudio} />
    </Stack.Navigator>
};

const styles = StyleSheet.create({
    container: { }
  });

export default ProfileNavigator;