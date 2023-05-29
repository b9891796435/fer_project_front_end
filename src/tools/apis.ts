import { Form, message } from "ant-design-vue";
import { useRouter } from "vue-router";
export const EMOTIONS = ["平静", "开心", "惊讶", "悲伤", "愤怒", "厌恶",
    "恐惧", "轻蔑"]
export interface loginBody {
    username: string,
    password: string
}
export type loginResType = string;
export type loginRes = {
    status: 'fail'
} | {
    status: 'success',
    token: string,
    permission: number
}
export interface baseBody {
    token: string
}
export type offerBody = {
    sdp: string,
    type: RTCSdpType,
    token: string
}
export type profileBody = {
    token: string
}
export type profileRes = {
    NAME: string;
    AGE: number;
    SEX: 'F' | 'M';
    UNAME: string;
    PASSWORD: string;
}
export interface recordBody extends baseBody {
    userId: number,
    pageNum: number
}
export interface recordItem {
    RECORD_ID: number,
    USERID: number,
    USE_TIME: number,
    PIC_PATH: string
}
export interface recordRes {
    count: number,
    data: recordItem[]
}
export interface editProfileBody extends baseBody, profileRes { }
const getURLConstructor = (url: string, body: any) => {
    //接受一个对象构造成GET请求的url
    let temp = url + "?";
    // eslint-disable-next-line
    for (let i in body) {
        if (typeof body[i] === 'bigint') {
            temp += i + '=' + body[i].toString() + '&'
        } else temp += i + '=' + body[i] + '&'
    }
    temp = temp.slice(0, temp.length - 1)
    return temp
}
const baseURL = "http://localhost:8081";
const apiURL = {
    login: "/login",
    register: "/register",
    offer: '/offer',
    profile: '/profile',
    editProfile: '/editProfile',
    queryRecord: '/queryRecord'
}
type fetchAPIResType<T> = { status: 'success', data: T } | { status: 'false', message: string } | { status: 'NoAuth' }
type fetchAPIRequestType = (
    input: string | RequestInfo,
    init?: RequestInit | undefined,
    isPOST?: boolean
) => Promise<any>
const fetchAPI: fetchAPIRequestType = async (input, init?, isFormdata?) => {
    let headers = new Headers({
        'content-type': 'application/json'
    })
    const res = await fetch(input, { ...init, headers });
    return res.json()
}
const apis = {
    login: async (arg0: loginBody, register?: boolean): Promise<loginResType> => {
        let result: loginResType = 'error'
        await fetch(baseURL + (!register ? apiURL.login : apiURL.register), {
            method: 'POST',
            body: JSON.stringify(arg0),
            headers: new Headers({
                'content-type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(function (res: loginRes) {
                if (res.status == 'success') {
                    localStorage.setItem('auth', res.token);
                    if (res.permission)
                        localStorage.setItem('role', String(res.permission))
                    result = 'success'
                }
                else result = 'error'
            })
            .catch(() => {
                result = 'error'
            })
        return result
    },
    offer: async (arg0: offerBody): Promise<RTCSessionDescriptionInit> => {
        return fetchAPI(baseURL + apiURL.offer, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    profile: async (arg0: profileBody): Promise<profileRes> => {
        return fetchAPI(baseURL + apiURL.profile, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    editProfile: async (arg0: editProfileBody): Promise<{ status: 'success' | 'fail' }> => {
        return fetchAPI(baseURL + apiURL.editProfile, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    queryRecord: async (arg0: recordBody): Promise<recordRes> => {
        return fetchAPI(baseURL + apiURL.queryRecord, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
};
export default apis;
(window as any).SetAuth = {
    driver: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiMiIsImV4cCI6MTY2NTU4Mjg2Mn0.3s7ERxJaq2D7dUC1Fnc-fAC-WOFhMkvn_o6eNyng1ME'),
    farmer: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiMyIsImV4cCI6MTY2NTU4NDMxM30.V5BffVTSZPC7st0lHVyNzdLVSHQBpN41WkCMCBpSph8'),
    product: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiNSIsImV4cCI6MTY2NTU4NDY1Nn0.2OYswqkiwb_DD5uCF5BfOsEC2MgGR4zOa_8g6P_usAg'),
    material: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiNyIsImV4cCI6MTY2NTU4NDcyMH0.PQ8zdtCKceqTvEUrcfN4qkjpBwgAN9jU9pjLCtsTJHo'),
    retailer: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiOCIsImV4cCI6MTY2NTc1NDU4OH0.HDALpWPMvFwTa9MsS9maKfn_-2UljmKZYxYJEa-5lvI'),
    tester: () => localStorage.setItem('auth', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaWJlciIsImVuZCI6IlYwVkNYMVZUUlZJPSIsImlkIjoiMSIsImV4cCI6MTY2NjA5MzEwNH0.DgAlp5zDxRGthaWqROGeY4e-JlZdXjc-PdV7-xuUmRY'),
    fetchAPI,
}