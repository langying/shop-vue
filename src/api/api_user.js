import http from './fetch.js';


export function login(params = {}) {
    return http({
        url: '/user/login',
        method: 'post',
        params:params
    });
}

export function register(params = {}) {
    return http({
        url: '/user/register',
        method: 'post',
        params:params
    });
}

export function getCode(params = {}) {
    return http({
        url: '/user/getCode',
        method: 'post',
        params:params
    });
}

export function editPwd(params = {}) {
    return http({
        url: '/user/editPwd',
        method: 'post',
        params:params
    });
}

export function queryApplyList(params = {}) {
    return http({
        url: '/user/applyList',
        method: 'post',
        params:params
    });
}

export function addFeedback(params = {}) {
    return http({
        url: '/user/feedback',
        method: 'post',
        params:params
    });
}

export function queryBrowseList(params = {}) {
    return http({
        url: '/user/browseList',
        method: 'post',
        params:params
    });
}


export function queryUpInfo(params = {}) {
    return http({
        url: '/user/upInfo',
        method: 'post',
        params:params
    });
}