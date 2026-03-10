import clearIcon from '@/assets/auth-page/icons/clear-icon.svg?react'
import eyeIcon from '@/assets/auth-page/icons/eye-icon.svg?react'
import eyeOffIcon from '@/assets/auth-page/icons/eye-off-icon.svg?react'
import lockIcon from '@/assets/auth-page/icons/lock-icon.svg?react'
import logo from '@/assets/auth-page/icons/logo.svg?react'
import userIcon from '@/assets/auth-page/icons/user-icon.svg?react'

const authAssets = {
   logo,
   userIcon,
   clearIcon,
   lockIcon,
   eyeIcon,
   eyeOffIcon,
}

type AuthFieldName = 'login' | 'password'

type AuthInput = {
   type: 'text' | 'password'
   name: AuthFieldName
   label: string
   placeholder: string
   leftIcon: (typeof authAssets)[keyof typeof authAssets]
   rightIcon?: (typeof authAssets)[keyof typeof authAssets]
   activeRightIcon?: (typeof authAssets)[keyof typeof authAssets]
}

const inputs: AuthInput[] = [
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
      activeRightIcon: authAssets.eyeIcon,
   },
]

export const authPageData = {
   login: {
      title: 'Добро пожаловать!',
      subtitle: 'Пожалуйста, авторизируйтесь',
      logo: authAssets.logo,
      inputs,
      errors: {
         login: {
            required: 'Введите логин.',
            min: 'Логин должен содержать минимум 2 символа.',
            pattern:
               'Логин может содержать только латинские буквы и цифры.',
         },
         password: {
            required: 'Введите пароль.',
            min: 'Пароль должен содержать минимум 8 символов.',
            pattern:
               'Пароль должен содержать хотя бы одну букву и одну цифру.',
         },
      },
      checkbox: 'Запомнить данные',
      checkboxError: '',
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
      errors: {
         login: {
            required: 'Введите логин.',
            min: 'Логин должен содержать минимум 2 символа.',
            pattern:
               'Логин может содержать только латинские буквы и цифры.',
         },
         password: {
            required: 'Введите пароль.',
            min: 'Пароль должен содержать минимум 8 символов.',
            pattern:
               'Пароль должен содержать хотя бы одну букву и одну цифру.',
         },
      },
      checkbox: 'Я принимаю условия',
      checkboxError: 'Нужно принять условия.',
      button: 'Создать аккаунт',
      divider: 'или',
      link: {
         prefix: 'Уже есть аккаунт?',
         text: 'Войти',
         to: '/auth/login',
      },
   },
}
