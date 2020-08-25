export const state = () => ({
  messages: [],
  dataLoaded: false
})

export const getters = {
  messages: (state) => {
    if (!state.messages) {
      return []
    } else {
      return state.messages
    }
  },
  dataLoaded: (state) => {
    return state.dataLoaded
  }
}

export const mutations = {
  MESSAGES (state, data) {
    state.messages = data
  },
  DATA_LOADED (state, data) {
    state.dataLoaded = data
  }
}

export const actions = {
  async getMessages ({ commit }) {
    try {
      const params = {
        id: '1B-DpIbxE23tA6q32NDIicSKJGVzFtTLlyNmM7gqJePY'
      }
      const res = await this.$api.get('', { params })
      const data = res.data.rows
      const finalData = data.map((v, index) => ({ ...v, index })).reverse()
      commit('MESSAGES', finalData || [])
    } catch (err) {
      commit('MESSAGES', [])
    }
  },
  setDataLoaded ({ commit }, data) {
    commit('DATA_LOADED', data)
  }
}
