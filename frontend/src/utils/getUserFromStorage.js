export const getUserFromStorage = ()=>{
    const userInfo =JSON.parse(localStorage.getItem("userInfo") || null);
    return userInfo?.token;
}
