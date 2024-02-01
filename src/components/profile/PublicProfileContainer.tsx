import { getClient } from '@src/api/Client';
import catchAsyncError from '@src/api/catchError';
import { useFetchIsFollowing } from '@src/hooks/query';
import { updateNotification } from '@src/store/notification';
import AvaterFields from '@ui/AvaterFields';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

interface Props {
  profile?: PublicProfile;
}

const PublicProfileContainer: FC<Props> = ({profile}) => {
  const {data: isFollowing} = useFetchIsFollowing(profile?.id || '')
  const dispatch = useDispatch();
  const queryClient = useQueryClient()

  const followingMutation = useMutation({
    mutationFn: async(id) =>toggleFollowing(id),
    onMutate: (id: string) => {
      queryClient.setQueryData<boolean>(['is-following', id], (oldData)=> !oldData)
    }
  })

  const toggleFollowing = async(id: string) =>{
    try {
      if(!id)return;

    const client = await getClient()
   await client.post('/profile/update-follower/'+ id);
   queryClient.invalidateQueries({queryKey: ['profile', id]})

    } catch (error) {
     const errorMessage = catchAsyncError(error)
     dispatch(updateNotification({message: errorMessage, type: 'error'}))
    }
      }

  if (!profile) return null;

  return (
    <View style={styles.container}>
      <AvaterFields source={profile.avatar} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>

        <Text style={styles.followerText}>
            {profile.followers} Followers
          </Text>

        <Pressable onPress={()=> followingMutation.mutate(profile.id)} style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            { isFollowing ? "Unfollow" : "Follow"} 
          </Text>
        </Pressable>
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
  followerText: {
    color: colors.CONSTRACT,
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
