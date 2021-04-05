export interface ApplicationUserModel {
    id: number;
    created: Date;
    lastUpdate: Date;
    username: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    roles: string[];
    failedLoginAttempts: number;
    emailVerificationAttempts: number;
    lastSuccessfulLoginTime: Date;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
}