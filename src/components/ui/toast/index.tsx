type ToastProps = {
   title: string
   description?: string
}

export const Toast = ({ title, description }: ToastProps) => {
   return (
      <article className="bg-neutral-0 w-full max-w-92 rounded-3xl border border-neutral-200 px-5 py-4 shadow-[0px_18px_30px_0px_rgba(0,0,0,0.08)]">
         <div className="flex flex-col gap-1">
            <h3 className="text-secondary-500 font-cairo text-base leading-5 font-bold">
               {title}
            </h3>
            {description ? (
               <p className="text-neutral-600 text-sm leading-5 font-medium">
                  {description}
               </p>
            ) : null}
         </div>
      </article>
   )
}
