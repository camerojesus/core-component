import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      oCapacitacion: {}
    }
  },
  getters: {
    unreadMessages: (state) => {
      return state.messages.filter(message => !message.read)
    }
  }
})