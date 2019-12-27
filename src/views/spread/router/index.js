import Vue from 'vue'
import Router from 'vue-router'
import utils from '@common/utils'

Vue.use(Router);

const spread1 = (resolve) => {
    import('../components/spread1/index.vue').then((module) => {
        resolve(module)
    })
}
const spreadLoad = (resolve) => {
    import('../components/spread1/load.vue').then((module) => {
        resolve(module)
    })
}
const load = (resolve) => {
    import('../components/load/index.vue').then((module) => {
        resolve(module)
    })
}
const spread2 = (resolve) => {
    import('../components/spread2/index.vue').then((module) => {
        resolve(module)
    })
}

const spread3 = (resolve) => {
    import('../components/spread3/index.vue').then((module) => {
        resolve(module)
    })
}

const spread4 = (resolve) => {
    import('../components/spread4/index.vue').then((module) => {
        resolve(module)
    })
}
const spread5 = (resolve) => {
    import('../components/spread5/index.vue').then((module) => {
        resolve(module)
    })
}
const spread6 = (resolve) => {
    import('../components/spread6/index.vue').then((module) => {
        resolve(module)
    })
}
const spread7 = (resolve) => {
    import('../components/spread7/index.vue').then((module) => {
        resolve(module)
    })
}

const agreement = (resolve) => {
    import('../components/agreement.vue').then((module) => {
        resolve(module)
    })
}


const routerGroup = new Router({
    linkActiveClass: "active",
    mode: "hash",
    routes: [
        {
            path: '/spreadOne',
            component: spread1,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/spread/load',
            component: spreadLoad,
            meta: {
                title: utils.constant.contact('name') + 'APP下载',
                keepAlive: false
            }
        },
        {
            path: '/load',
            component: load,
            meta: {
                title: utils.constant.contact('name') + 'APP下载',
                keepAlive: false
            }
        },
        {
            path: '/spreadTwo',
            component: spread2,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/spreadThree',
            component: spread3,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/agreement',
            component: agreement,
            meta: {
                title: utils.constant.contact('name') + '注册协议',
                keepAlive: false
            }
        },
        {
            path: '/spreadFour',
            component: spread4,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/spreadFive',
            component: spread5,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/spreadSix',
            component: spread6,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        {
            path: '/spreadSeven',
            component: spread7,
            meta: {
                title: utils.constant.contact('name'),
                keepAlive: false
            }
        },
        
    ]
})

// 需要缓存的页面有两个设置
// 1、path添加至keepAliveGroup中
// 2、routes中对应的位置将keepAlive设为true
const keepAliveGroup = ['index'];

// 需要每次返回都刷新的页面
const refreshGroup = ['/systemUpgrade'];

// index
export default {
    routerGroup,
    keepAliveGroup,
    refreshGroup
}