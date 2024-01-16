import TrackPlayer, {
    Track,
    usePlaybackState,
    State,
  } from 'react-native-track-player';
  import {useDispatch, useSelector} from 'react-redux';
  import {AudioData} from 'src/@types/audio';
  import {getPlayerState, updateOnGoingAudio, updateOnGoingList} from '@src/store/player';
import deepEqual from 'deep-equal';
  
  const updateQueue = async (data: AudioData[]) => {
    const lists: Track[] = data.map(item => {
      return {
        id: item.id,
        title: item.title,
        url: item.file,
        artwork: item.poster || require('../assets/music.png'),
        artist: item.owner.name,
        genre: item.category,
        isLiveStream: true,
      };
    });
    await TrackPlayer.add([...lists]);
  };
  
  const useAudioController = () => {
    const {state: playbackState} = usePlaybackState() as {state?: State};

    const {onGoingAudio, onGoingList} = useSelector(getPlayerState);
    const dispatch = useDispatch();
  
    const isPalyerReady = playbackState !== State.None;
  
    const onAudioPress = async (item: AudioData, data: AudioData[]) => {
      if (!isPalyerReady) {
        // Playing audio for the first time.
        await updateQueue(data);
        const index = data.findIndex(audio => audio.id === item.id);
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        dispatch(updateOnGoingAudio(item));
        return dispatch(updateOnGoingList(data))
      }
  
      if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
        // same audio is already playing (handle pause)
        return await TrackPlayer.pause();
      }
  
      if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
        // same audio no need to load handle resume
        return await TrackPlayer.play();
      }

      if(onGoingAudio?.id !== item.id){
        const fromSameList = deepEqual(onGoingList, data)
        await TrackPlayer.pause()
        
        const index = data.findIndex(audio => audio.id === item.id);    

        if(!fromSameList){
        // play new audio from diffrent list 
        await TrackPlayer.reset();
        await updateQueue(data);
        dispatch(updateOnGoingList(data))
    }

        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        dispatch(updateOnGoingAudio(item))
      }
    };
  
    return {onAudioPress};
  };
  
  export default useAudioController;
  