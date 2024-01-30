import {getPlayerState, updatePlaybackRate} from '@src/store/player';
import AppLink from '@ui/AppLink';
import AppModal from '@ui/AppModal';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {useProgress} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import formatDuration from 'format-duration';
import Slider from '@react-native-community/slider';
import useAudioController from '@src/hooks/useAudioController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import PlayPauseBtn from '@ui/PlayPauseBtn';
import PlayerController from '@ui/PlayerController';
import Loader from '@ui/Loader';
import PlayBackRateSelector from '@ui/PlayBackRateSelector';
import AudioinfoContainer from './AudioinfoContainer';
import MaterialCommIcon from 'react-native-vector-icons/MaterialCommunityIcons'

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onListOptionPress?(): void;
  onProfileLinkPress?(): void;
}

const formatedDuration = (duration = 0) => {
  return formatDuration(duration, {
    leading: true,
  });
};

const AudioPlayer: FC<Props> = ({visible, onRequestClose, onProfileLinkPress, onListOptionPress}) => {
  const [showAudioInfo, setShowAudioInfo] = useState(false);
  const {onGoingAudio, playbackRate} = useSelector(getPlayerState);
  const {
    isPlaying,
    isBusy,
    onPreviousPress,
    onNextPress,
    seekTo,
    skipTo,
    togglePlayPause,
    setPlaybackRate,
  } = useAudioController();
  const poster = onGoingAudio?.poster;
  const source = poster ? {uri: poster} : require('../assets/music.png');

  const {duration, position} = useProgress();
  const dispatch = useDispatch();

  const handleOnNextPress = async () => {
    await onNextPress();
  };

  const handlePreviousPress = async () => {
    await onPreviousPress();
  };

  const updateSeek = async (value: number) => {
    await seekTo(value);
  };

  const handleSkipTo = async (skipType: 'forward' | 'reverse') => {
    if (skipType === 'forward') await skipTo(10);
    if (skipType === 'reverse') await skipTo(-10);
  };

  const onPlaybackRatePress = async (rate: number) => {
    await setPlaybackRate(rate);
    dispatch(updatePlaybackRate(rate));
  };

//   if (showAudioInfo)
//     return (

//     );

  return (
    <AppModal animation visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Pressable onPress={()=>setShowAudioInfo(true)} style={styles.infoButton}>
          <AntDesign name="infocirlceo" color={colors.CONSTRACT} size={24} />
        </Pressable>
        <AudioinfoContainer
            visible={showAudioInfo}
            closeHandler={setShowAudioInfo}
          />
        <Image source={source} style={styles.poster} />
        <View style={styles.contentent}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink onPress={onProfileLinkPress} title={onGoingAudio?.owner.name || ''} />

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
            <PlayerController onPress={handlePreviousPress} ignoreContainer>
              <AntDesign
                name="stepbackward"
                size={24}
                color={colors.CONSTRACT}
              />
            </PlayerController>

            {/* skip time left */}
            <PlayerController
              onPress={() => handleSkipTo('reverse')}
              ignoreContainer>
              <FontAwsome
                name="rotate-left"
                size={18}
                color={colors.CONSTRACT}
              />
              <Text style={styles.skipText}>-10s</Text>
            </PlayerController>

            {/* play pause button */}
            <PlayerController>
              {isBusy ? (
                <Loader color={colors.PRIMARY} />
              ) : (
                <PlayPauseBtn
                  playing={isPlaying}
                  onPress={togglePlayPause}
                  color={colors.PRIMARY}
                />
              )}
            </PlayerController>

            {/* skip time right  */}
            <PlayerController
              onPress={() => handleSkipTo('forward')}
              ignoreContainer>
              <FontAwsome
                name="rotate-right"
                size={18}
                color={colors.CONSTRACT}
              />
              <Text style={styles.skipText}>+10s</Text>
            </PlayerController>

            {/* next */}
            <PlayerController onPress={handleOnNextPress} ignoreContainer>
              <AntDesign
                name="stepforward"
                size={24}
                color={colors.CONSTRACT}
              />
            </PlayerController>
          </View>

          <PlayBackRateSelector
            onPress={onPlaybackRatePress}
            activeRate={playbackRate.toString()}
            containerStyle={{marginTop: 20}}
          />
          <View style={styles.listOptionBtnContainer}>
            <PlayerController onPress={onListOptionPress} ignoreContainer>
                <MaterialCommIcon name='playlist-music' size={24} color={colors.CONSTRACT}/>
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skipText: {
    fontSize: 12,
    marginTop: 2,
    color: colors.CONSTRACT,
  },
  infoButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  listOptionBtnContainer:{
    alignItems: 'flex-end',
  }
});

export default AudioPlayer;
