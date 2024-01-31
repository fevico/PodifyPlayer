import LatestUploads from '@components/LatestUploads';
import OptionsModal from '@components/OptionsModal';
import PlaylistForm, {PlaylistInfo} from '@components/PlaylistForm';
import PlayListModal from '@components/PlaylistModal';
import RecommendedAudios from '@components/RecommendedAudios';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import { ScrollView, StyleSheet, Pressable, Text, View} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from '@src/@types/audio';
import catchAsyncError from '@src/api/catchError';
import {getClient} from '@src/api/Client';
import {useFetchPlaylist} from '@src/hooks/query';
import {updateNotification} from '@src/store/notification';
import useAudioController from '@src/hooks/useAudioController';
import AppView from '@components/AppView';
import RecentlyPlayed from '@components/RecentlyPlayed';
import RecommendedPlaylist from '@components/RecommendedPlaylist';
import { updatePlaylistVisibility, updateSelectedList } from '@src/store/playlistModal';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const {onAudioPress} = useAudioController()

  const {data} = useFetchPlaylist();

  const dispatch = useDispatch();

  const handleOnFavPress = async () => {
    if (!selectedAudio) return;
    // send request with the audio id that we want to add to fav

    try {
      const client = await getClient();

      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateNotification({message: errorMessage, type: 'error'}));
    }

    setSelectedAudio(undefined);
    setShowOptions(false);
  };

  const handleOnLongPress = (audio: AudioData) => {
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnAddToPlaylist = () => {
    setShowOptions(false);
    setShowPlaylistModal(true);
  };

  const handlePlaylistSubmit = async (value: PlaylistInfo) => {
    if (!value.title.trim()) return;

    try {
      const client = await getClient();
      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public',
      });
      console.log(data);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };

  const updatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });

      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        updateNotification({message: 'New audio added.', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      console.log(errorMessage);
    }
  };

  const handleOnListPress = (playlist: Playlist) =>{
    dispatch(updateSelectedList(playlist.id))
    dispatch(updatePlaylistVisibility(true));
  }

  return (
    <AppView>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.space}>
      <RecentlyPlayed/>
      </View>

      <View style={styles.space}>
      <LatestUploads
        onAudioPress={onAudioPress}
        onAudioLongPress={handleOnLongPress}
      />
      </View>
      
      <View style={styles.space}>
      <RecommendedAudios
        onAudioPress={onAudioPress}
        onAudioLongPress={handleOnLongPress}
      />
      </View>
      
      <View style={styles.space}>
      <RecommendedPlaylist onListPress={handleOnListPress}/>
      </View>
      
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false);
        }}
        options={[
          {
            title: 'Add to playlist',
            icon: 'playlist-music',
            onPress: handleOnAddToPlaylist,
          },
          {
            title: 'Add to favorite',
            icon: 'cards-heart',
            onPress: handleOnFavPress,
          },
        ]}
        renderItem={item => {
          return (
            <Pressable onPress={item.onPress} style={styles.optionContainer}>
              <MaterialComIcon
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.optionLabel}>{item.title}</Text>
            </Pressable>
          );
        }}
      />
      <PlayListModal
        visible={showPlaylistModal}
        onRequestCose={() => {
          setShowPlaylistModal(false);
        }}
        list={data || []}
        onCreateNewPress={() => {
          setShowPlaylistModal(false);
          setShowPlaylistForm(true);
        }}
        onPlaylistPress={updatePlaylist}
      />

      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </ScrollView>

    </AppView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  space:{
    marginBottom: 15,
  },
  optionLabel: {color: colors.PRIMARY, fontSize: 16, marginLeft: 5},
});

export default Home;
