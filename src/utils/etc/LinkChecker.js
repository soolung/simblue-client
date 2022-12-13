export const checkUrlForm = (strUrl) => {
    const expUrl = /^http[s]?\:\/\//i;
    return expUrl.test(strUrl);
}
