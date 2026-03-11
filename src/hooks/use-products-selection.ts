import { useMemo, useState } from 'react'

type SelectableItem = {
   id: number
}

export const useProductsSelection = (items: SelectableItem[] | undefined) => {
   const { itemIds, itemIdsSignature } = useMemo(() => {
      const itemIds = items?.map(({ id }) => id) ?? []
      return { itemIds, itemIdsSignature: itemIds.join(',') }
   }, [items])

   const [selectionState, setSelectionState] = useState({
      itemIdsSignature,
      selectedIds: new Set<number>(),
   })

   const resolveCurrentIds = (state: typeof selectionState): Set<number> =>
      state.itemIdsSignature === itemIdsSignature
         ? state.selectedIds
         : new Set<number>()

   const selectedIds = resolveCurrentIds(selectionState)

   const toggleOne = (id: number) => {
      setSelectionState((prev) => {
         const next = new Set(resolveCurrentIds(prev))

         if (next.has(id)) {
            next.delete(id)
         } else {
            next.add(id)
         }

         return { itemIdsSignature, selectedIds: next }
      })
   }

   const toggleAll = () => {
      setSelectionState((prev) => {
         const current = resolveCurrentIds(prev)
         const isEverySelected =
            itemIds.length > 0 && itemIds.every((id) => current.has(id))
         return {
            itemIdsSignature,
            selectedIds: isEverySelected ? new Set() : new Set(itemIds),
         }
      })
   }

   const clearSelection = () => {
      setSelectionState({ itemIdsSignature, selectedIds: new Set() })
   }

   return {
      selectedIds,
      isSelected: (id: number) => selectedIds.has(id),
      isAllSelected:
         itemIds.length > 0 && itemIds.every((id) => selectedIds.has(id)),
      toggleOne,
      toggleAll,
      clearSelection,
   }
}
