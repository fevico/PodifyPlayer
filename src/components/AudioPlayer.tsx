import {getPlayerState} from '@src/store/player';
import AppLink from '@ui/AppLink';
import AppModal from '@ui/AppModal';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {useSelector} from 'react-redux';
import formatDuration from 'format-duration';
import Slider from '@react-native-community/slider';
import useAudioController from '@src/hooks/useAudioController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import PlayPauseBtn from '@ui/PlayPauseBtn';
import PlayerController from '@ui/PlayerController';

interface Props {
  visible: boolean;
  onRequestClose(): void;
}

const formatedDuration = (duration = 0) => {
  return formatDuration(duration, {
    leading: true,
  });
};

const AudioPlayer: FC<Props> = ({visible, onRequestClose}) => {
  const {onGoingAudio} = useSelector(getPlayerState);
  const {seekTo} = useAudioController()
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const {duration, position} = useProgress();

  const updateSeek = async(value: number) =>{
    await seekTo(value);
  }

  return (
    <AppModal animation visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Image source={source} style={styles.poster} />
        <View style={styles.contentent}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink title={onGoingAudio?.owner.name || ''} />

          <View style={styles.durationContainer}>
            <Text style={styles.duration}>
              {formatedDuration(position * 1000)}
            </Text>
            <Text style={styles.duration}>
              {formatedDuration(duration * 1000)}
            </Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.CONSTRACT}
            maximumTrackTintColor={colors.INACTIVE_CONSTRACT}
            value={position}
            onSlidingComplete={updateSeek}
            // onSlidingComplete={}
          />
          <View style={styles.controls}>
            {/* Previous */}
            <PlayerController ignoreContainer>
                <AntDesign name='stepbackward' size={24} color={colors.CONSTRACT}/>
            </PlayerController>
            
            {/* skip time left */}
            <PlayerController ignoreContainer>
                <FontAwsome name='rotate-left' size={18} color={colors.CONSTRACT}/>
            </PlayerController>

            {/* play pause button */}
            <PlayerController>
            <PlayPauseBtn color={colors.PRIMARY}/>
            </PlayerController>
            
            {/* skip time right  */}
            <PlayerController ignoreContainer>
                <FontAwsome name='rotate-right' size={18} color={colors.CONSTRACT}/>
            </PlayerController>

            {/* next */}
            <PlayerController ignoreContainer>
                <AntDesign name='stepforward' size={24} color={colors.CONSTRACT}/>
            </PlayerController>

          </View>
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentent: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONSTRACT,
  },
  duration: {
    color: colors.CONSTRACT,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  controls:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  }
});

export default AudioPlayer;
