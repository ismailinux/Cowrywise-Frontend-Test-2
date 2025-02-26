import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        loading: false,
        searching: false,
        // isSearchInitiated: false,
    }),
    persist: true
})

