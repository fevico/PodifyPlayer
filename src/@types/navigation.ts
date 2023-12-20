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
}