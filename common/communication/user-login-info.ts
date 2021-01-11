export interface UserLoginInfo {
    username: string;
    password: string;
}

export interface LoginResult {
    isLoggedIn: boolean;
    sessionId: string;
    username: string;
    userPhoto?: string
}
