import {useFetchPlaylistAudios} from '@src/hooks/query';
import useAudioController from '@src/hooks/useAudioController';
import {getPlayerState} from '@src/store/player';
import {
  getPlaylistModalState,
  updatePlaylistVisibility,
} from '@src/store/playlistModal';
import AppModal from '@ui/AppModal';
import AudioListItem from '@ui/AudioListItems';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

interface Props {}

const PlaylistAudioModal: FC<Props> = props => {
  const {visible, selectedListId} = useSelector(getPlaylistModalState);
  const dispatch = useDispatch();
  const {data, isLoading} = useFetchPlaylistAudios(selectedListId || '');

  const {onGoingAudio} = useSelector(getPlayerState);
  const {onAudioPress} = useAudioController();
  const handleClose = () => {
    dispatch(updatePlaylistVisibility(false));
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <AudioListLoadingUi />;
      </View>
    );

  return (
    <AppModal visible={visible} onRequestClose={handleClose}>
      <Text style={styles.title}>{data?.title}</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={data?.audios}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <AudioListItem
            onPress={()=> onAudioPress(item, data?.audios || [])}
              isPlaying={onGoingAudio?.id === item.id}
              audio={item}
            />
          );
        }}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONSTRACT,
    fontWeight: '500',
    fontSize: 18,
    padding: 10,
  },
});

export default PlaylistAudioModal;
