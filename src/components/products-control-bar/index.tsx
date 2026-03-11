import ArrowsClockwiseIcon from '@/assets/products-page/icons/arrows-clockwise.svg?react'
import PlusCircleIcon from '@/assets/products-page/icons/plus-circle.svg?react'
import { AddProductForm } from '@/components/add-product-form'
import { Button } from '@/components/ui/button'
import { ModalWrapper } from '@/components/ui/modal-wrapper'
import { productsPageData } from '@/data/products-page'
import { useModal } from '@/hooks/use-modal'
import { useToast } from '@/hooks/use-toast'

type ProductsControlBarProps = {
   isFetching: boolean
   onRefresh: () => void
}

export const ProductsControlBar = ({
   isFetching,
   onRefresh,
}: ProductsControlBarProps) => {
   const { title, refreshLabel, addButton, addModal } = productsPageData.controls
   const { isOpen, openModal, closeModal } = useModal()
   const { toast } = useToast()

   const handleProductSuccess = () => {
      toast(addModal.toast)
      closeModal()
   }

   return (
      <>
         <section className="mt-7.5 flex items-center justify-between px-7.5 pt-7.5 pb-10">
            <h2 className="font-cairo text-xl leading-5 font-bold text-neutral-900">
               {title}
            </h2>
            <div className="flex items-center gap-2">
               <Button
                  variant="icon"
                  aria-label={refreshLabel}
                  disabled={isFetching}
                  onClick={onRefresh}
               >
                  <ArrowsClockwiseIcon className="size-5.5" />
               </Button>
               <Button variant="default-with-icon" onClick={openModal}>
                  <PlusCircleIcon className="size-5.5" />
                  <span className="ml-3.75">{addButton}</span>
               </Button>
            </div>
         </section>
         <ModalWrapper
            isOpen={isOpen}
            title={addModal.title}
            closeLabel={addModal.closeLabel}
            onClose={closeModal}
         >
            <AddProductForm
               onCancel={closeModal}
               onSuccess={handleProductSuccess}
            />
         </ModalWrapper>
      </>
   )
}
