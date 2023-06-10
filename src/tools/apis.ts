import { Form, message } from "ant-design-vue";
import { useRouter } from "vue-router";
export const EMOTIONS = ["平静", "开心", "惊讶", "悲伤", "愤怒", "厌恶",
    "恐惧", "轻蔑"]
export interface baseFailRes {
    status: 'fail'
}
export interface baseSuccessRes {
    status: 'success'
}
export interface loginBody {
    username: string,
    password: string
}
export type loginResType = string;
export type loginRes = {
    status: 'fail',
    msg?: string
} | {
    status: 'success',
    token: string,
    permission: number
}
export type offerBody = {
    sdp: string,
    type: RTCSdpType,
    token: string
}
export type profileBody = {
    token: string
}
export type profileItem = {
    NAME: string;
    AGE: number;
    SEX: 'F' | 'M';
    UNAME: string;
    PASSWORD: string;
}
export interface profileSuccessRes extends baseSuccessRes {
    data: {
        profile: profileItem,
    }
}
export interface profileRecordBody {
    page: number
}
export interface profileRecordSuccessRes extends baseSuccessRes {
    data: {
        record: recordItem[],
        count: number
    }
}
export interface recordBody {
    userId: number,
    page: number
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
export interface pubDynamicBody {
    content: string,
    recordId: number,
}
export interface dynamicListBody {
    page: number
}
export interface dynamicItemSummery {
    NAME: string,
    PUBLISH_TIME: number,
    DY_CONTENT: string,
    LIKE_COUNT: number,
    DYNAMIC_ID: number,
    PIC_PATH: string
}
export interface commentItem {
    NAME: string,
    PUBLISH_TIME: number,
    COMMENT_CONTENT: string,
    LIKE_COUNT: number,
    COMMENT_ID: number
}
export interface dynamicaListSuccessRes extends baseSuccessRes {
    data: dynamicItemSummery[],
    count: number
}
export interface dynamicDetailSuccessRes extends baseSuccessRes {
    data: commentItem[],
    count: number
}
export interface likeCommentBody {
    commentID: number
}
export interface likeDynamicBody {
    dynamicID: number
}
export interface donationBody {
    count: number
}
export interface pubCommentBody {
    content: string,
    dynamicID: number
}
export interface superProfileBody {
    page: number,
}
export interface profileDetailForSuperItem extends profileItem {
    donation: number,
    USERID: number,
    AUT_NUM: number
}
export interface superProfileSuccessRes extends baseSuccessRes {
    data: {
        profile: profileDetailForSuperItem[],
        count: number
    }
}
export interface editProfileBodySuper extends editProfileBody {
    userid: number,
    autNum: number
}
export interface queryQueryRecordBody {
    userid: number,
    page: number
}
export interface queryRecordItem {
    USERID: number,
    QUERYID: number,
    QUERYTIME: number
}
export interface queryQueryRecordSuccessRes extends baseSuccessRes {
    data: {
        record: queryRecordItem[],
        count: number
    }
}
export interface editProfileBody extends profileItem { }
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
    profileRecord: '/profileRecord',
    editProfile: '/editProfile',
    queryRecord: '/queryRecord',
    pubDynamic: '/pubDynamic',
    dynamicList: '/dynamicList',
    dynamicDetail: '/dynamicDetail',
    likeComment: '/likeComment',
    likeDynamic: '/likeDynamic',
    pubComment: '/pubComment',
    donation: '/donation',
    superProfile: '/superProfile',
    queryQueryRecord: '/queryQueryRecord',
    cancelAccount: '/cancelAccount',
    deleteDynamic:'/deleteDynamic'
}
type fetchAPIResType<T> = { status: 'success', data: T } | { status: 'false', message: string } | { status: 'NoAuth' }
type fetchAPIRequestType = (
    input: string | RequestInfo,
    init?: RequestInit | undefined,
    isPOST?: boolean
) => Promise<any>

const fetchAPI: fetchAPIRequestType = async (input, init?) => {
    let headers = new Headers({
        'content-type': 'application/json',
        'auth': localStorage.getItem('auth') as string
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
                    localStorage.setItem('role', String(res.permission))
                    result = 'success'
                }
                else {
                    if(res.msg){
                        result=res.msg
                    }else{
                        result='error'
                    }
                }
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
    profile: async (arg0: profileBody): Promise<baseFailRes | profileSuccessRes> => {
        return fetchAPI(baseURL + apiURL.profile, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    profileRecord: async (arg0: profileRecordBody): Promise<baseFailRes | profileRecordSuccessRes> => {
        return fetchAPI(baseURL + apiURL.profileRecord, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    editProfile: async (arg0: editProfileBody | editProfileBodySuper): Promise<{ status: 'success' | 'fail' }> => {
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
    pubDynamic: async (arg0: pubDynamicBody): Promise<baseSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.pubDynamic, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    pubComment: async (arg0: pubCommentBody): Promise<baseSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.pubComment, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    dynamicList: async (arg0: dynamicListBody): Promise<dynamicaListSuccessRes | baseFailRes> => {
        return fetchAPI(getURLConstructor(baseURL + apiURL.dynamicList, arg0), {
            method: 'GET',
        })
    },
    dynamicDetail: async (arg0: { dynamicID: number, page: number }): Promise<dynamicDetailSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.dynamicDetail, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    likeComment: async (arg0: likeCommentBody): Promise<baseSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.likeComment, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    likeDynamic: async (arg0: likeDynamicBody): Promise<baseSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.likeDynamic, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    donation: async (arg0: donationBody): Promise<baseSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.donation, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    superProfile: async (arg0: superProfileBody): Promise<superProfileSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.superProfile, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    queryQueryRecord: async (arg0: queryQueryRecordBody): Promise<queryQueryRecordSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.queryQueryRecord, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    cancelAccount: async (): Promise<queryQueryRecordSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.cancelAccount, {
            method: 'POST',
        })
    },
    cancelAccountSuper: async (arg0: { userid: number }): Promise<queryQueryRecordSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.cancelAccount, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
    deleteDynamic:async (arg0: { dynamicID: number }): Promise<queryQueryRecordSuccessRes | baseFailRes> => {
        return fetchAPI(baseURL + apiURL.deleteDynamic, {
            body: JSON.stringify(arg0),
            method: 'POST',
        })
    },
};
export default apis;
(window as any).SetAuth = {
    test: apis,
    fetchAPI,
}