//存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}

//获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN');
}

//清空本地数据
export const removeToken = () => {
    return localStorage.removeItem('TOKEN');
}