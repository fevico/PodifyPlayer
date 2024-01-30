import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicProfileTabParamsList } from '@src/@types/navigation';
import { useFetchPublicPlaylist } from '@src/hooks/query';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import { ScrollView } from 'react-native';
import {View, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<PublicProfileTabParamsList, 'PublicPlaylist'>

const PublicPlaylistTab: FC<Props> = (props) =>{
  const {data} = useFetchPublicPlaylist(props.route.params.profileId);
  return (
    <ScrollView style={styles.container}>
        {data?.map(playlist =>{
            return <PlaylistItem key={playlist.id} playlist={playlist}/>
        })}
    </ScrollView>
  );};

const styles = StyleSheet.create({
container: {},
});

export default PublicPlaylistTab;