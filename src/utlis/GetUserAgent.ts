export default function GetUserAgent(){
    const userAgent: string = globalThis.navigator.userAgent;
    return userAgent;
}