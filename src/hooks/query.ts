import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import {getClient} from "@src/api/Client";
import catchAsyncError from "@src/api/catchError";
import { updateNotification } from "@src/store/notification";
import { AudioData, History, Playlist } from "@src/@types/audio";

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

    return useQuery(['recently-played'], {
        queryFn: () => fetchRecommendedPlaylist(),
        onError(err) {
            const errorMessage = catchAsyncError(err)
            console.log(err)
            dispatch(updateNotification({message: errorMessage, type: 'error'}))
        },
    });
}