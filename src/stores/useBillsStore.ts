import { type IMappedBill } from '@/types/bills'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IBillsStore {
  favoriteBills: IMappedBill[]
  toggleFavoriteBill: (bill: IMappedBill) => void
  isFavoriteBill: (billId: string) => boolean
}

const initialValues = {
  favoriteBills: [],
}

export const useBillsStore = create<IBillsStore>()(
  persist(
    (set, get) => ({
      ...initialValues,
      toggleFavoriteBill: (bill) => {
        set((state) => {
          const isFavorite = state.favoriteBills.some((favoriteBill) => favoriteBill.id === bill.id)

          const logMessage = isFavorite
            ? 'Request dispatched: removing bill from favorites on server'
            : 'Request dispatched: adding bill to favorites on server'

          console.log(logMessage)

          return {
            favoriteBills: isFavorite
              ? state.favoriteBills.filter((favoriteBill) => favoriteBill.id !== bill.id)
              : [...state.favoriteBills, bill],
          }
        })
      },
      isFavoriteBill: (billId) => {
        return get().favoriteBills.some((bill) => bill.id === billId)
      },
    }),
    {
      name: 'bills-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
