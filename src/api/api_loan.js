import http from './fetch.js';

export function queryLoanList(params = {}) {
    return http({
        url: '/product/list',
        method: 'post',
        params:params
    });
}
export function loanDetail(params = {}) {
    return http({
        url: '/product/detail',
        method: 'get',
        params:params
    });
}


export function queryColumnList(params = {}) {
    return http({
        url: '/column/list',
        method: 'post',
        params:params
    });
}

export function loanRecord(params = {}) {
    return http({
        url: '/product/record',
        method: 'post',
        params:params
    });
}
export function loanApply(params = {}) {
    return http({
        url: '/product/apply',
        method: 'post',
        params:params
    });
}
