import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const tabs = (resolve) => {
    import('../components/tabs.vue').then((module) => {
        resolve(module)
    })
}

const home = (resolve) => {
    import('../components/home/index.vue').then((module) => {
        resolve(module)
    })
}
const loan = (resolve) => {
    import('../components/loan/index.vue').then((module) => {
        resolve(module)
    })
}

const loanDetail = (resolve) => {
    import('../components/loan/detail.vue').then((module) => {
        resolve(module)
    })
}

const notice = (resolve) => {
    import('../components/notice/index.vue').then((module) => {
        resolve(module)
    })
}
const strategy = (resolve) => {
    import('../components/strategy/index.vue').then((module) => {
        resolve(module)
    })
}

const my = (resolve) => {
    import('../components/my/index.vue').then((module) => {
        resolve(module)
    })
}

const applyRecord = (resolve) => {
    import('../components/my/applyRecord.vue').then((module) => {
        resolve(module)
    })
}

const login = (resolve) => {
    import('../components/other/login.vue').then((module) => {
        resolve(module)
    })
}
const sigin = (resolve) => {
    import('../components/other/sigin.vue').then((module) => {
        resolve(module)
    })
}
const register = (resolve) => {
    import('../components/other/register.vue').then((module) => {
        resolve(module)
    })
}
const setting = (resolve) => {
    import('../components/other/setting.vue').then((module) => {
        resolve(module)
    })
}

const pwd = (resolve) => {
    import('../components/other/pwd.vue').then((module) => {
        resolve(module)
    })
}

const apply = (resolve) => {
    import('../components/loan/apply.vue').then((module) => {
        resolve(module)
    })
}

const browse = (resolve) => {
    import('../components/browse/index.vue').then((module) => {
        resolve(module)
    })
}
const feedback = (resolve) => {
    import('../components/feedback/index.vue').then((module) => {
        resolve(module)
    })
}

const help = (resolve) => {
    import('../components/help/index.vue').then((module) => {
        resolve(module)
    })
}

const aboutUs = (resolve) => {
    import('../components/aboutUs/index.vue').then((module) => {
        resolve(module)
    })
}

const strategyDetail = (resolve) => {
    import('../components/strategy/detail.vue').then((module) => {
        resolve(module)
    })
}

const guide = (resolve) => {
    import('../components/loan/guide.vue').then((module) => {
        resolve(module)
    })
}
const loanList = (resolve) => {
    import('../components/loan/list.vue').then((module) => {
        resolve(module)
    })
}
const applyUmeng = (resolve) => {
    import('../components/loan/applyUmeng.vue').then((module) => {
        resolve(module)
    })
}
const loanSpread = (resolve) => {
    import('../components/loan/spread.vue').then((module) => {
        resolve(module)
    })
}
const agreement = (resolve) => {
    import('../components/other/agreement.vue').then((module) => {
        resolve(module)
    })
}

const routerGroup = new Router({
    linkActiveClass: "active",
    mode: "hash",
    routes: [
        {
            path: '/',
            redirect: (localStorage.getItem("token") ? '/tabs/home' : '/sigin')
        },
        {
            path: '/tabs',
            component: tabs,
            meta: {
                keepAlive: false
            },
            children:[{
                path:'home',
                component:home,
                meta:{keepAlive: true}
            },{
                path:'loan',
                component:loan,
                meta:{keepAlive: true}
            },{
                
                path:'canborrow',
                component:loanList,
                meta:{keepAlive: true}
            },{
                path:'my',
                component:my,
                meta:{keepAlive: true}
            }]
        },
        {
            path: '/my',
            component: my,
            meta: {
                title: '登录',
                keepAlive: false
            }
        },
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录',
                keepAlive: false
            }
        },
        {
            path: '/sigin',
            component: sigin,
            meta: {
                title: '登录',
                keepAlive: false
            }
        },
        // 注册
        {
            path: '/register',
            component: register,
            meta: {
                title: '注册',
                keepAlive: false
            },
        },
        //设置
        {
            path: '/setting',
            component: setting,
            meta: {
                title: '设置',
                keepAlive: false
            },
        },
        //设置密码
        {
            path: '/pwd',
            component: pwd,
            meta: {
                title: '设置密码',
                keepAlive: false
            },
        },
        //申请记录
        {
            path: '/applyRecord',
            component: applyRecord,
            meta: {
                title: '申请记录',
                keepAlive: false
            },
        },
        {
            path:'/notice',
            component:notice,
            meta: {
                title: '我的消息',
                keepAlive: false
            },
        },
        // 贷款详情        
        {
            path: '/loanDetail',
            component: loanDetail,
            meta: {
                title: '贷款详情',
                keepAlive: false
            },
        },
        {
            path: '/apply',
            component: apply,
            meta: {
                title: '立即申请',
                keepAlive: false
            },
        },
        // 浏览记录
        {
            path: '/browse',
            component: browse,
            meta: {
                title: '浏览记录',
                keepAlive: false
            },
        },
        // 意见反馈
        {
            path: '/feedback',
            component: feedback,
            meta: {
                title: '意见反馈',
                keepAlive: false
            },
        },
        // 意见反馈
        {
            path: '/help',
            component: help,
            meta: {
                title: '帮助中心',
                keepAlive: false
            },
        },
        // 关于我们
        {
            path: '/aboutUs',
            component: aboutUs,
            meta: {
                title: '关于我们',
                keepAlive: false
            },
        },
        {
            path: '/strategy/detail/:id',
            component: strategyDetail,
            meta: {
                title: '攻略详情',
                keepAlive: false
            },
        },
        {
            path: '/guide',
            component: guide,
            meta: {
                title: '分类引导',
                keepAlive: false
            },
        },
        {
            path: '/loanList',
            component: loanList,
            meta: {
                title: '贷款',
                keepAlive: false
            },
        },
        {
            path: '/applyUmeng',
            component: applyUmeng,
            meta: {
                title: '贷款',
                keepAlive: false
            },
        },
        {
            path: '/loanSpread',
            component: loanSpread,
            meta: {
                title: '贷款',
                keepAlive: false
            },
        },
        {
            path: '/agreement',
            component: agreement,
            meta: {
                title: '注册协议',
                keepAlive: false
            }
        }
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