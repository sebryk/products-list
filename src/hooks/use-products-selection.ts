import { useMemo, useState } from 'react'

type SelectableItem = {
   id: number
}

export const useProductsSelection = (
   items: SelectableItem[] | undefined,
) => {
   const itemIds = useMemo(() => items?.map(({ id }) => id) ?? [], [items])
   const itemIdsSignature = itemIds.join(',')
   const [selectionState, setSelectionState] = useState<{
      itemIdsSignature: string
      selectedIds: Set<number>
   }>({
      itemIdsSignature,
      selectedIds: new Set(),
   })

   const selectedIds =
      selectionState.itemIdsSignature === itemIdsSignature
         ? selectionState.selectedIds
         : new Set<number>()

   const toggleOne = (id: number) => {
      setSelectionState((currentSelectionState) => {
         const currentSelectedIds =
            currentSelectionState.itemIdsSignature === itemIdsSignature
               ? currentSelectionState.selectedIds
               : new Set<number>()
         const nextSelectedIds = new Set(currentSelectedIds)

         if (nextSelectedIds.has(id)) {
            nextSelectedIds.delete(id)
         } else {
            nextSelectedIds.add(id)
         }

         return {
            itemIdsSignature,
            selectedIds: nextSelectedIds,
         }
      })
   }

   const toggleAll = () => {
      setSelectionState((currentSelectionState) => {
         const currentSelectedIds =
            currentSelectionState.itemIdsSignature === itemIdsSignature
               ? currentSelectionState.selectedIds
               : new Set<number>()
         const isEveryItemSelected =
            itemIds.length > 0 &&
            itemIds.every((id) => currentSelectedIds.has(id))

         if (isEveryItemSelected) {
            return {
               itemIdsSignature,
               selectedIds: new Set<number>(),
            }
         }

         return {
            itemIdsSignature,
            selectedIds: new Set(itemIds),
         }
      })
   }

   const clearSelection = () => {
      setSelectionState({
         itemIdsSignature,
         selectedIds: new Set<number>(),
      })
   }

   const isSelected = (id: number) => selectedIds.has(id)
   const isAllSelected =
      itemIds.length > 0 && itemIds.every((id) => selectedIds.has(id))

   return {
      selectedIds,
      isSelected,
      isAllSelected,
      toggleOne,
      toggleAll,
      clearSelection,
   }
}
