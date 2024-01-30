import {useFetchUploadsByProfile} from '@src/hooks/query';
import useAudioController from '@src/hooks/useAudioController';
import { getPlayerState } from '@src/store/player';
import AudioListItems from '@ui/AudioListItems';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import EmptyRecords from '@ui/EmptyRecords';
import {FC} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';

interface Props {}

const UploadTab: FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile();
  const {onAudioPress} = useAudioController();
 const {onGoingAudio} = useSelector(getPlayerState)

  if (isLoading) return <AudioListLoadingUi />;

  if (!data?.length) return <EmptyRecords title="There is no audio!" />;

  return (
    <ScrollView style={styles.container}>
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

export default UploadTab;
