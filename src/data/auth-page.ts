import checkboxIcon from '@/assets/auth-page/icons/checkbox-icon.svg'
import clearIcon from '@/assets/auth-page/icons/clear-icon.svg'
import eyeOffIcon from '@/assets/auth-page/icons/eye-off-icon.svg'
import lockIcon from '@/assets/auth-page/icons/lock-icon.svg'
import logo from '@/assets/auth-page/icons/logo.svg'
import userIcon from '@/assets/auth-page/icons/user-icon.svg'

const authAssets = {
   logo,
   checkboxIcon,
   userIcon,
   clearIcon,
   lockIcon,
   eyeOffIcon,
}

const inputs = [
   {
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      leftIcon: authAssets.userIcon,
      rightIcon: authAssets.clearIcon,
   },
   {
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      leftIcon: authAssets.lockIcon,
      rightIcon: authAssets.eyeOffIcon,
   },
]

export const authPageData = {
   login: {
      title: 'Добро пожаловать!',
      subtitle: 'Пожалуйста, авторизируйтесь',
      logo: authAssets.logo,
      inputs,
      checkbox: 'Запомнить данные',
      checkboxIcon: authAssets.checkboxIcon,
      button: 'Войти',
      divider: 'или',
      link: {
         prefix: 'Нет аккаунта?',
         text: 'Создать',
         to: '/auth/register',
      },
   },
   register: {
      title: 'Создать аккаунт',
      subtitle: 'Пожалуйста, заполните данные',
      logo: authAssets.logo,
      inputs,
      checkbox: 'Я принимаю условия',
      checkboxIcon: authAssets.checkboxIcon,
      button: 'Создать аккаунт',
      divider: 'или',
      link: {
         prefix: 'Уже есть аккаунт?',
         text: 'Войти',
         to: '/auth/login',
      },
   },
}
