import AppView from '@components/AppView';
import PublicPlaylistTab from '@components/profile/PublicPlaylistTab';
import PublicProfileContainer from '@components/profile/PublicProfileContainer';
import PublicUploads from '@components/profile/PublicUploads';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeNavigationStackParamList, PublicProfileTabParamsList} from '@src/@types/navigation';
import { useFetchPublicProfile } from '@src/hooks/query';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Tab = createMaterialTopTabNavigator<PublicProfileTabParamsList>();


type Props = NativeStackScreenProps<
  HomeNavigationStackParamList,
  'PublicProfile'
>;

const PublicProfile: FC<Props> = ({route}) => {
  const {profileId} = route.params;
  const {data} = useFetchPublicProfile(profileId)
  return (
    <AppView>
    <View style={styles.container}>
        <PublicProfileContainer profile={data}/>

        <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen name="PublicUploads" component={PublicUploads} options={{
            tabBarLabel: "Uploads"
        }}
        initialParams={{profileId}}
        />
        <Tab.Screen name="PublicPlaylist" component={PublicPlaylistTab} options={{
            tabBarLabel: "Playlist"
        }} 
        initialParams={{profileId}}
        />
      </Tab.Navigator>
    </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  tabBar: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowRadius: 0,
    shadowColor: 'transparent',
    textShadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    color: colors.CONSTRACT,
    fontSize: 12,
  },
});

export default PublicProfile;
