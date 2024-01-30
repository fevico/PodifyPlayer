import { useFetchPublicUploads } from '@src/hooks/query';
import {FC} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AudioListItems from '@ui/AudioListItems';
import EmptyRecords from '@ui/EmptyRecords';
import AudioListLoadingUi from '@ui/AudioListLoadingUi';
import useAudioController from '@src/hooks/useAudioController';
import { useSelector } from 'react-redux';
import { getPlayerState } from '@src/store/player';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicProfileTabParamsList } from '@src/@types/navigation';


type Props = NativeStackScreenProps<PublicProfileTabParamsList, 'PublicUploads'>

const PublicUploads: FC<Props> = (props) =>{
  const {data, isLoading} = useFetchPublicUploads(props.route.params.profileId)

  const {onAudioPress} = useAudioController()
  const {onGoingAudio} = useSelector(getPlayerState)

  if (isLoading) return <AudioListLoadingUi />;

  if (!data?.length) return <EmptyRecords title="There is no audio!" />;

return <ScrollView style={styles.container}>
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
};

const styles = StyleSheet.create({
container: {},
});

export default PublicUploads;