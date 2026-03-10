import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'

export function HomePage() {
   const user = useAuthStore((state) => state.user)
   const logout = useAuthStore((state) => state.logout)

   return (
      <main className="bg-neutral-100 text-neutral-900 flex min-h-screen items-center justify-center px-4 py-8">
         <section className="bg-neutral-0 flex w-full max-w-120 flex-col gap-6 rounded-[32px] p-8 shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-2">
               <p className="text-primary-600 text-sm font-semibold tracking-[0.08em] uppercase">
                  Auth Demo
               </p>
               <h1 className="text-3xl font-semibold text-neutral-900">
                  {user?.firstName
                     ? `Привет, ${user.firstName}!`
                     : 'Вы авторизованы.'}
               </h1>
               <p className="text-base text-neutral-500">
                  {user?.username
                     ? `Текущий пользователь: ${user.username}`
                     : 'Сессия успешно восстановлена.'}
               </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
               <Button href="/auth/login" variant="link">
                  Перейти к форме входа
               </Button>
               <Button onClick={logout}>Выйти</Button>
            </div>
         </section>
      </main>
   )
}
