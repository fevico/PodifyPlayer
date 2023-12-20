import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@views/auth/Profile';
import ProfileSettings from '@components/profile/ProfileSettings';

const Stack = createNativeStackNavigator()

interface Props {}

const ProfileNavigator: FC<Props> = (props) =>{
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='profile' component={Profile} />
        <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
    </Stack.Navigator>
};

const styles = StyleSheet.create({
    container: { }
  });

export default ProfileNavigator;