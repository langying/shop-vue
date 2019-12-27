import http from './fetch.js';

export function queryNoticeList(params = {}) {
    return http({
        url: '/message/list',
        method: 'post',
        params:params
    });
}
