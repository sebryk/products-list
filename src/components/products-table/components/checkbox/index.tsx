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
            className="border-neutral-550 peer-checked:bg-primary-600 peer-checked:border-primary-600 size-5.5 rounded border"
         />
      </label>
   )
}
