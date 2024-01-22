import useAudioController from '@src/hooks/useAudioController';
import { getPlayerState } from '@src/store/player';
import AudioListModal from '@ui/AudioListModal';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const CurrentAudioList: FC<Props> = ({visible, onRequestClose}) => {
    const {onGoingList} = useSelector(getPlayerState)
    const {onAudioPress} = useAudioController()
  return (
    <View style={styles.container}>
      <AudioListModal
        visible={visible}
        onRequestClose={onRequestClose}
        header="Audios on the way"
        data={onGoingList}
        onItemPress={onAudioPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CurrentAudioList;
