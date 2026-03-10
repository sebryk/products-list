type DividerProps = {
   text: string
}

export function Divider({ text }: DividerProps) {
   return (
      <div className="flex w-full items-center gap-2.5">
         <span className="h-px flex-1 bg-neutral-200" />
         <span className="text-base text-neutral-500">{text}</span>
         <span className="h-px flex-1 bg-neutral-200" />
      </div>
   )
}
