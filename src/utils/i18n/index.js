import { createI18n } from 'vue-i18n'
import uz from './uz'
import ru from './ru'
import useCore from '@/store/core.pinia'

const i18nFactory = () => {
  const corePinia = useCore()
  return createI18n({
    legacy: false,
    locale: corePinia.locale,
    fallbackLocale: 'uz',
    messages: { uz, ru }
  })
}

export default i18nFactory
