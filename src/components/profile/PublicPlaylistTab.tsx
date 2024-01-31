import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Playlist } from '@src/@types/audio';
import { PublicProfileTabParamsList } from '@src/@types/navigation';
import { useFetchPublicPlaylist } from '@src/hooks/query';
import { updatePlaylistVisibility, updateSelectedList } from '@src/store/playlistModal';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import { ScrollView } from 'react-native';
import {View, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<PublicProfileTabParamsList, 'PublicPlaylist'>

const PublicPlaylistTab: FC<Props> = (props) =>{
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);
  const dispatch = useDispatch();

  const handleOnListPress = (playlist: Playlist) => {
    dispatch(updateSelectedList(playlist.id));
    dispatch(updatePlaylistVisibility(true));
  };

  return (
    <ScrollView style={styles.container}>
        {data?.map(playlist =>{
            return <PlaylistItem onPress={() => handleOnListPress(playlist)} key={playlist.id} playlist={playlist}/>
        })}
    </ScrollView>
  );};

const styles = StyleSheet.create({
container: {},
});

export default PublicPlaylistTab;