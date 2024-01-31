import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import {getClient} from "@src/api/Client";
import catchAsyncError from "@src/api/catchError";
import { updateNotification } from "@src/store/notification";
import { AudioData, CompletePlaylist, History, Playlist } from "@src/@types/audio";

const fetchLatest = async(): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/audio/latest')
    return data.audios
 }

export const useFetchLatestAudios = () => {
    const dispatch = useDispatch()

    return useQuery(['latest-uploads'], {
        queryFn: () => fetchLatest(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}


const fetchRecommended = async(): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/profile/recomended')
    return data.audios
 }

export const useFetchRecommendedAudios = () => { 
    const dispatch = useDispatch();

    return useQuery(['recommended'], {
        queryFn: () => fetchRecommended(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            console.log(errorMessage)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchPlaylist = async(): Promise<Playlist[]> =>{
    const client = await getClient()
    const {data} = await client('/playlist/by-profile');
        
    return data.playlist
 }

export const useFetchPlaylist = () => {
    const dispatch = useDispatch()

    return useQuery(['playlist'], {
        queryFn: () => fetchPlaylist(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchUploadsByProfile = async(): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/profile/uploads');
    return data.audios;
 }

export const useFetchUploadsByProfile = () => {
    const dispatch = useDispatch()

    return useQuery(['uploads-by-profile'], {
        queryFn: () => fetchUploadsByProfile(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchFavourite = async(): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/favourite');
    return data.audios;
 }

export const useFetchFavourite = () => {
    const dispatch = useDispatch()

    return useQuery(['favourite'], {
        queryFn: () => fetchFavourite(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchHistories = async(): Promise<History[]> =>{
    const client = await getClient()
    const {data} = await client('/history');
    return data.histories;
 }

export const useFetchHistories = () => {
    const dispatch = useDispatch()

    return useQuery(['histories'], {
        queryFn: () => fetchHistories(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            // console.log(errorMessage)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}


const fetchRecentlyPlayed = async(): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/history/recently-played');
    return data.audios;
 }

export const useFetchRecentlyPlayed = () => {
    const dispatch = useDispatch()

    return useQuery(['recently-played'], {
        queryFn: () => fetchRecentlyPlayed(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            console.log(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchRecommendedPlaylist = async(): Promise<Playlist[]> =>{
    const client = await getClient()
    const {data} = await client('/profile/auto-generated-playlist');
    return data.playlist;
 }

export const useFetchRecommendedPlaylist = () => {
    const dispatch = useDispatch()

    return useQuery(['recomended-playlist'], {
        queryFn: () => fetchRecommendedPlaylist(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            console.log(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}

const fetchIsFavourite = async(id: string): Promise<boolean[]> =>{
    const client = await getClient()
    const {data} = await client('/favourite/is-fav?audioId=' + id);
    return data.result;
 }

export const useFetchIsFavourite = (id: string) => {
    const dispatch = useDispatch()

    return useQuery(['favourite', id], {
        queryFn: () => fetchIsFavourite(id),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
        enabled: id ? true : false,
    });
}

const fetchPublicProfile = async(id: string): Promise<PublicProfile> =>{
    const client = await getClient()
    const {data} = await client('/profile/info/' + id);
    return data.profile;
 }

export const useFetchPublicProfile = (id: string) => {
    const dispatch = useDispatch()

    return useQuery(['profile', id], {
        queryFn: () => fetchPublicProfile(id),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
        enabled: id ? true : false,
    });
}

const fetchPublicUploads = async(id: string): Promise<AudioData[]> =>{
    const client = await getClient()
    const {data} = await client('/profile/uploads/' + id);
    return data.audios;
 }

export const useFetchPublicUploads = (id: string) => {
    const dispatch = useDispatch()

    return useQuery(['uploads', id], {
        queryFn: () => fetchPublicUploads(id),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
        enabled: id ? true : false,
    });
}

const fetchPublicPlaylist = async(id: string): Promise<Playlist[]> =>{
    const client = await getClient()
    const {data} = await client('/profile/playlist/' + id);
    return data.playlist;
 }

export const useFetchPublicPlaylist = (id: string) => {
    const dispatch = useDispatch()

    return useQuery(['playlist', id], {
        queryFn: () => fetchPublicPlaylist(id),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
        enabled: id ? true : false,
    });
}

const fetchPlaylistAudios = async(id: string): Promise<CompletePlaylist> =>{
    const client = await getClient()
    const {data} = await client('/profile/playlist-audios/'+ id);
    return data.list;
 }

export const useFetchPlaylistAudios = (id: string) => {
    const dispatch = useDispatch()

    return useQuery(['playlist-audio', id], {
        queryFn: () => fetchPlaylistAudios(id),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
        enabled: id ? true : false,
    });
}