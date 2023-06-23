import { createI18n } from "vue-i18n";
// 載入語言
// @ts-ignore
import tw from '@/locales/tw.json'
// @ts-ignore
import en from '@/locales/en.json'

function loadLocaleMessages () {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key).default
        }
    })
    return messages
}

export default createI18n({
    locale: 'tw',           // 設定語言
    fallbackLocale: 'tw',   // 若選擇的語言缺少翻譯則退回的語言
    globalInjection: true,
    legacy: false,
    messages: {
        'tw': tw,
        'en': en
    }
})
