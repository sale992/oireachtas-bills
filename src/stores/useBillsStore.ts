import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { type MappedBill } from '../types/bills'

interface IBillsStore {
  favoriteBills: MappedBill[]
  toggleFavoriteBill: (bill: MappedBill) => void
  isFavoriteBill: (billId: string) => boolean
}

export const useBillsStore = create<IBillsStore>()(
  persist(
    (set, get) => ({
      favoriteBills: [],

      toggleFavoriteBill: (bill) => {
        const favoriteBills = get().favoriteBills

        const hasBill = favoriteBills.find((favoriteBill) => favoriteBill.id === bill.id)

        if (hasBill) {
          set({ favoriteBills: favoriteBills.filter((favoriteBill) => favoriteBill.id !== bill.id) })
        } else {
          set({ favoriteBills: [...favoriteBills, bill] })
        }

        console.log(
          hasBill
            ? 'Request dispatched: removing bill from favorites on server'
            : 'Request dispatched: adding bill to favorites on server'
        )
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
