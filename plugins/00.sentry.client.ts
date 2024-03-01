import * as Sentry from '@sentry/vue'

// @see https://www.lichter.io/articles/nuxt3-sentry-recipe/
export default defineNuxtPlugin({
    name: 'sentry',
    parallel: true,
    setup(nuxtApp) {
        const router = useRouter()
        const runtimeConfig = useRuntimeConfig()
        const { sentry, site } = runtimeConfig.public

        if (!sentry.dsn) {
            return
        }

        Sentry.init({
            app: nuxtApp.vueApp,
            dsn: sentry.dsn,
            environment: site.environment,
            integrations: [
                new Sentry.BrowserTracing({
                    routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                }),
            ],
        })
    },
})
