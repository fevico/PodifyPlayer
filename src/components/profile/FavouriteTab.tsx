import {useFetchFavourite} from '@src/hooks/query';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import {FC} from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import AudioListItems from '@ui/AudioListItems';
import useAudioController from '@src/hooks/useAudioController';
import {useSelector} from 'react-redux';
import {getPlayerState} from '@src/store/player';
import colors from '@utils/colors';
import { useQueryClient } from 'react-query';

interface Props {}

const FavouriteTab: FC<Props> = props => {
  const {data, isLoading, isFetching} = useFetchFavourite();
  const {onAudioPress} = useAudioController();
  const {onGoingAudio} = useSelector(getPlayerState);
  const queryClient = useQueryClient();


  const handleOnRefresh = () =>{
    queryClient.invalidateQueries({queryKey: ['favourite']})
  }

  if (isLoading) return <AudioListLoadingUi />;

  return (
    <ScrollView  refreshControl={
      <RefreshControl
        refreshing={isFetching}
        onRefresh={handleOnRefresh}
        tintColor={colors.CONSTRACT}
      />
    }style={styles.container}>
      {!data?.length ? <EmptyRecords title="There is no favourite!" />: null}
      {data?.map(item => {
        return (
          <AudioListItems
            onPress={() => onAudioPress(item, data)}
            audio={item}
            key={item.id}
            isPlaying={onGoingAudio?.id === item.id}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavouriteTab;
