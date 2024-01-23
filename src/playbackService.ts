import TrackPlayer, {Event} from 'react-native-track-player';
import { getClient } from './api/Client';

let timeoutId: number 

const debounce = (fun: Function, delay: number)=>{
  return (...args: any)=>{
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      fun.apply(null, args)
    }, delay)
  };
};
interface StaleAudio {
  audio: string,
      progress: number,
      date: Date,
}

const sendHistory = async(StaleAudio: StaleAudio) =>{
  const client = await getClient();
   await client.post('/history', {
    ...StaleAudio
  }).catch(err => console.log(err));
}

const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play()
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause()
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext()
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious()
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
    const list = await TrackPlayer.getQueue();
    const audio = list[e.track];
  const StaleAudio = {
    audio: audio.id,
      progress: e.position,
      date: new Date(Date.now())
  }

   const debouncedHistory = debounce(sendHistory, 100)
   debouncedHistory(StaleAudio);
  });
};

export default playbackService;
