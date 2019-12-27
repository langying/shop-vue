import http from './fetch.js';

export function queryStrategyList(params = {}) {
    return http({
        url: '/news/list',
        method: 'post',
        params:params
    });
}

export function queryStrategyDetail(params = {}) {
    return http({
        url: '/news/detail',
        method: 'post',
        params:params
    });
}
