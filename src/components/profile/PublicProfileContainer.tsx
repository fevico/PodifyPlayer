import AvaterFields from '@ui/AvaterFields';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  profile?: PublicProfile;
}

const PublicProfileContainer: FC<Props> = ({profile}) => {

  if (!profile) return null;

  return (
    <View style={styles.container}>
      <AvaterFields source={profile.avatar} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>

        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
        </View>
      </View>

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
    marginTop: 5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PublicProfileContainer;
