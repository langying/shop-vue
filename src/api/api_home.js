import http from './fetch.js';

export function queryPromoteList(params = {}) {
    return http({
        url: '/promote/list',
        method: 'post',
        params:params
    });
}

export function queryBannerList(params = {}) {
    return http({
        url: '/advert/list',
        method: 'post',
        params:params
    });
}