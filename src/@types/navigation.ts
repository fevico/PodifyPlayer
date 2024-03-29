import { AudioData } from "./audio";

interface NewUserResponse {
    id?: string;
    name: string;
    email:string;
}

export type AuthStackParamList = {
    SignUp: undefined;
    SignIn: undefined;
    LostPassword: undefined;
    Verification: {userInfo: NewUserResponse};
}

export type ProfileNavigationStackParamList = {
    Profile: undefined;
    ProfileSettings: undefined;
    UpdateAudio: {audio: AudioData};
    Verification: {userInfo: NewUserResponse};
}

export type HomeNavigationStackParamList = {
    PublicProfile: {profileId: string};
    Profile: undefined;
    Home: undefined;
}

export type PublicProfileTabParamsList = {
    PublicUploads: {profileId: string};
    PublicPlaylist: {profileId: string};
}