import { useFetchPlaylist } from '@src/hooks/query';
import PlaylistItem from '@ui/PlaylistItem';
import {FC} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

interface Props {}

const PlaylistTab: FC<Props> = props => {
   const {data, isLoading} = useFetchPlaylist()

  return (
    <ScrollView style={styles.container}>
        {data?.map(playlist =>{
            return <PlaylistItem key={playlist.id} playlist={playlist}/>
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PlaylistTab;
