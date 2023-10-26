// import { pwa } from './config/pwa'

export default defineNuxtConfig({
    modules: [
        '@nuxtjs/color-mode',
        '@nuxt/devtools',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@vite-pwa/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        'nuxt-swiper',
    ],
    experimental: {
        // when using generate, payload js assets included in sw precache manifest
        // but missing on offline, disabling extraction it until fixed
        payloadExtraction: false,
        inlineSSRStyles: false,
        typedPages: true,
    },
    css: ['@unocss/reset/tailwind.css', '~/assets/scss/app.scss'],
    colorMode: {
        classSuffix: '',
    },
    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        prerender: {
            crawlLinks: false,
            // routes: ['/'],
            // ignore: ['/hi'],
        },

        // experimental: {
        //     // https://nitro.unjs.io/guide/utils#experimental-composition-api
        //     asyncContext: true, // 设置defineEventHandler不用传递event -> defineEventHandler(()=>{}) 2.6版本以上才生效
        // },
        // storage: {
        //     // redis: {
        //     //     driver: 'redis',
        //     //     /* redis connector options */
        //     // },
        //     db: {
        //         driver: 'fs',
        //         base: './.data/db',
        //     },
        // },
    },
    app: {
        head: {
            viewport: 'width=device-width,initial-scale=1',
            // link: [
            //     { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
            //     { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
            //     { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            // ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                // { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },
    // pwa,
    vite: {
        plugins: [],
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: '@use "~/assets/scss/default.scss" as *;', // 注意文件路径要配成自己的
        //         },
        //     },
        // },

        server: {
            proxy: {
                '/apis': {
                    target: 'http://xxxxxxxx',
                    rewrite: path => path.replace(/^\/apis/, ''),
                },
            },
        },
    },
    runtimeConfig: {
        // 仅在服务端serve可以访问
        appKey: 'abcd',
        upload: {
            host: process.env.NUXT_UPLOAD_HOST || '',
            dir: process.env.NUXT_UPLOAD_DIR || '',
        },
        jwt: {
            secret: process.env.NUXT_JWT_SECRET || '',
        },
        // public里的在服务端serve,客户端client皆可访问
        public: {
            apiBase: process.env.VITE_API_BASE || '',
            secret: process.env.NUXT_AUTH_SECRET, // You can generate one with `openssl rand -base64 32`
        },
    },

    i18n: {
        // locale: 'cn',
        locales: [
            {
                code: 'cn',
                name: '简体中文',
                file: 'cn.json',
            },
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },

            // {
            //   code: 'fr',
            //   file: 'fr-FR.ts'
            // }
        ],
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'cn', // default locale of your project for Nuxt pages and routings
        // strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root', // recommended
            // alwaysRedirect: true,
            // fallbackLocale: 'zh',
        },
        // customRoutes: 'page',
        // pages: {
        //     login: {
        //         en: false,
        //     },
        // },
    },
})
