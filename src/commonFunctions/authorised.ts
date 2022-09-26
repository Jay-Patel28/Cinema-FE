
export const handleAuth = () => {
    if(!hasValidToken()) return false;
    return true;
}

export const hasValidToken = () => {
    return (localStorage.getItem("jwt") !== null);
};
