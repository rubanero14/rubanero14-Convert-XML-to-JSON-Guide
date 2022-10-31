export default class Util {
    static UrlEncoder (url) {
        return url.replaceAll('=','%3D')
        .replaceAll(' ','%20')
        .replaceAll('/','%2F')
        .replaceAll('"','%22')
        .replaceAll('&','%26')
    }
}