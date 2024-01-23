import AppHeader from '@components/AppHeader';
import AvaterFields from '@ui/AvaterFields';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import {getClient} from '@src/api/Client';
import catchAsyncError from '@src/api/catchError';
import {updateNotification} from '@src/store/notification';
import {useDispatch, useSelector} from 'react-redux';
import {keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import {
  updateProfile,
  updateLoggedInState,
  updateBusyState,
  getAuthState,
} from '@src/store/auth';
import deepEqual from 'deep-equal';
import ImagePicker from 'react-native-image-crop-picker';
import { getPermissionToReadImages } from '@utils/helper';
import ReVerificationLink from '@components/ReVerificationLink';

interface Props {}
interface ProfileInfo {
  name: string;
  avater?: string;
}

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avater: profile?.avatar,
  });

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim())
        return dispatch(
          updateNotification({
            message: 'Profile name is required',
            type: 'error',
          }),
        );
      const formData = new FormData();
      formData.append('name', userInfo.name);

      if(userInfo.avater){
        formData.append('avater', {
          name: "avater",
          type: "image/jpeg",
          uri: userInfo.avater
        })
      }

      const client = await getClient({'Content-Type': 'multipart/form-data'});
      const {data} = await client.post('/auth/update-profile', formData);
      dispatch(updateProfile(data.profile));
      dispatch(
        updateNotification({
          message: 'Your Profile is updated.',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  const handleImageSelect = async () => {
    try {
      await getPermissionToReadImages()
      const {path} = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 300,
      });

      setUserInfo({...userInfo, avater: path})

    } catch (error) {
      console.log(error);
    }
  };

  const cleraHistory = () => {
    console.log('clearing out history')
  }

  const handleOnHistoryClear = () =>{
    Alert.alert("Are you sure?", "This action will clear out all the history!", [
      {
        text: 'Clear',
        style: 'destructive',
        onPress(){
          cleraHistory()
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]),
    {
      cancelable: true
    }
  }

  useEffect(() => {
    if (profile) setUserInfo({name: profile.name, avater: profile.avatar});
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvaterFields source={userInfo.avater} />
          <Pressable onPress={handleImageSelect} style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={text => setUserInfo({...userInfo, name: text})}
          style={styles.nameInput}
          value={userInfo.name}
        />
        <View style={styles.emailConainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          {profile?.verified ? <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />: <ReVerificationLink LinkTitle='verify' activeAtFirst />}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
      <Pressable onPress={handleOnHistoryClear} style={styles.buttonContainer}>
          <MaterialComIcon name="broom" size={20} color={colors.CONSTRACT} />
          <Text style={styles.buttonTitle}>Clear All</Text>
        </Pressable>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONSTRACT} />
          <Text style={styles.buttonTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.buttonContainer}>
          <AntDesign name="logout" size={20} color={colors.CONSTRACT} />
          <Text style={styles.buttonTitle}>Logout</Text>
        </Pressable>
      </View>

      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            onPress={handleSubmit}
            title="Update"
            borderRadius={7}
            busy={busy}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONSTRACT,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONSTRACT,
    borderRadius: 7,
    marginTop: 15,
  },
  emailConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONSTRACT,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonTitle: {
    color: colors.CONSTRACT,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
