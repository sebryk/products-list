type TableCheckboxProps = {
   checked: boolean
   onChange: () => void
   ariaLabel: string
}

export const TableCheckbox = ({
   checked,
   onChange,
   ariaLabel,
}: TableCheckboxProps) => {
   return (
      <label className="inline-flex cursor-pointer items-center">
         <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            aria-label={ariaLabel}
            className="peer sr-only"
         />
         <span
            aria-hidden="true"
            className="border-neutral-550 peer-checked:bg-secondary-500 peer-checked:border-secondary-500 size-5.5 rounded border"
         />
      </label>
   )
}
