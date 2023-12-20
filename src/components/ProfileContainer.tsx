import {UserProfile} from '@src/store/auth';
import AvaterFields from '@ui/AvaterFields';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ProfileNavigationStackParamList } from '@src/@types/navigation';

interface Props {
  profile?: UserProfile | null;
}

const ProfileContainer: FC<Props> = ({profile}) => {
  const {navigate} = useNavigation<NavigationProp<ProfileNavigationStackParamList>>();
  if (!profile) return null;

  return (
    <View style={styles.container}>
      <AvaterFields source={profile.avatar} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>
          <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
          <Text style={styles.profileActionLink}>
            {profile.followings} Followings
          </Text>
        </View>
      </View>
      <Pressable onPress={() => navigate('ProfileSettings') } style={styles.settingsBtn}>
        <AntDesign name="setting" size={22} color={colors.CONSTRACT} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: colors.CONSTRACT,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: colors.CONSTRACT,
    marginRight: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    paddingLeft: 10,
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    padding: 4,
    paddingVertical: 2,
    margin: 5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileContainer;
