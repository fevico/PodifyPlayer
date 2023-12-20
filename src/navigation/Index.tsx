import {FC, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from '@src/store/auth';
import TabNavigator from './TabNavigator';
import {getFromAsyncStorage, keys} from '@utils/asyncStorage';
import client from '@src/api/Client';
import Loader from '@ui/Loader';
import { View, StyleSheet } from 'react-native';
import colors from '@utils/colors';

interface Props {} 

const AppTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONSTRACT
  }
}

const AppNavigator: FC<Props> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(keys.AUTH_TOKEN);
        if (!token) {
          return dispatch(updateBusyState(false));
        }

        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log('Auth error: ', error);
      }
      dispatch(updateBusyState(false));
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex:1,
          }}>
          <Loader />
        </View>
       ) : null} 
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
