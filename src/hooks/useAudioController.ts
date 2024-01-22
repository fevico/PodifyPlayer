import TrackPlayer, {
    Track,
    usePlaybackState,
    State,
    AppKilledPlaybackBehavior,
    Capability,
  } from 'react-native-track-player';
  import {useDispatch, useSelector} from 'react-redux';
  import {AudioData} from '@src/@types/audio';
  import {getPlayerState, updateOnGoingAudio, updateOnGoingList} from '@src/store/player';
import deepEqual from 'deep-equal';
import { useEffect } from 'react';

  let isReady = false
  
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
    const isPlaying = playbackState === State.Playing;
    const isPaused = playbackState === State.Paused;
    const isBusy = playbackState === State.Buffering || playbackState === State.Connecting;
    
    const onAudioPress = async (item: AudioData, data: AudioData[]) => {
      if (!playbackState) {
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

    const togglePlayPause = async() => {
      if(isPlaying) await TrackPlayer.pause()
      if(isPaused) await TrackPlayer.play()
  }

  const seekTo = async (position: number) => {
    await TrackPlayer.seekTo(position);
  }

  const skipTo = async (sec: number) =>{
   const currentPosition =  await TrackPlayer.getPosition()
    await TrackPlayer.seekTo(currentPosition + sec);
  };

 const onNextPress = async () =>{
  const currentList = await TrackPlayer.getQueue();
  const currentIndex = await TrackPlayer.getCurrentTrack();
  if(currentIndex === null) return 

  const nextIndex = currentIndex + 1;

  const nextaudio = currentList[nextIndex]

  if(nextaudio){
    await TrackPlayer.skipToNext()
    dispatch(updateOnGoingAudio(onGoingList[nextIndex])) 
  }
 }

 const onPreviousPress = async () =>{
  const currentList = await TrackPlayer.getQueue(); 
  const currentIndex = await TrackPlayer.getCurrentTrack();
  if(currentIndex === null) return 

  const preIndex = currentIndex - 1;

  const nextaudio = currentList[preIndex];

  if(nextaudio){
    await TrackPlayer.skipToPrevious()
    dispatch(updateOnGoingAudio(onGoingList[preIndex]))
  }
 };

 const setPlaybackRate = async(rate: number) =>{
  await TrackPlayer.setRate(rate)
 }

 useEffect(()=>{
  const setUpPlayer = async() => {
    if(isReady) return 
    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
      progressUpdateEventInterval:1,
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities:[
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ]
    })
  }
  setUpPlayer()
  isReady = true
}, [])
  
    return {onAudioPress, setPlaybackRate, onPreviousPress, onNextPress, togglePlayPause, skipTo, seekTo, isBusy, isPalyerReady, isPlaying};
  }; 
  
  export default useAudioController;
