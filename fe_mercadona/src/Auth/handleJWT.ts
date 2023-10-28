import { authenticationResponse, claim } from "./auth.models";

const tokenKey = 'token';
const expirationKey = 'token-expiration';

export function saveToken(authData: authenticationResponse) {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(expirationKey, authData.expiration.toString());
}
export function getClaim(): claim[] {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
        return [];
    }
    const expiration = localStorage.getItem(expirationKey);
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
        logOut();
        return [];  //the token has expired
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response: claim[] = [];
    for (const property in dataToken) {
        response.push({ name: property, value: dataToken[property] });
    }

    return response;
}

export function logOut() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}