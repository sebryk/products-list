import clearIcon from '@/assets/auth-page/icons/clear-icon.svg?react'
import eyeOffIcon from '@/assets/auth-page/icons/eye-off-icon.svg?react'
import lockIcon from '@/assets/auth-page/icons/lock-icon.svg?react'
import logo from '@/assets/auth-page/icons/logo.svg?react'
import userIcon from '@/assets/auth-page/icons/user-icon.svg?react'

const authAssets = {
   logo,
   userIcon,
   clearIcon,
   lockIcon,
   eyeOffIcon,
}

const inputs = [
   {
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      leftIcon: authAssets.userIcon,
      rightIcon: authAssets.clearIcon,
   },
   {
      type: 'password',
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
      button: 'Создать аккаунт',
      divider: 'или',
      link: {
         prefix: 'Уже есть аккаунт?',
         text: 'Войти',
         to: '/auth/login',
      },
   },
}
