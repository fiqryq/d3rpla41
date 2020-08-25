<template>
  <div>
    <v-fade-transition>
      <div v-show="isLoaded">
        <v-app-bar
          :value="appBar"
          app
          fixed
          color="primary"
          dark
          flat
        >
          <v-container grid-list-xs class="pa-0 pa-md-2">
            <v-layout align-center row wrap>
              <template v-if="backBtn">
                <v-btn icon @click="back">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer />
              </template>
              <template v-if="toolbarSearch">
                <v-text-field
                  v-model="search"
                  autofocus
                  hide-details
                  placeholder="Cari Nama Wisudawan.."
                  single-line
                  clearable
                  @change="filterData"
                  @input="filterData"
                  @keydown.enter="filterData"
                  @keydown.esc="toggleSearch"
                />
                <v-spacer v-if="!$vuetify.breakpoint.mobile" />
                <div v-else class="mx-1" />
              </template>
              <template v-else>
                <v-toolbar-title>🎉</v-toolbar-title>
                <v-spacer />
              </template>

              <v-btn icon @click="toggleSearch">
                <v-icon>{{ toolbarSearch ? 'mdi-magnify-close' : 'mdi-magnify' }}</v-icon>
              </v-btn>
            </v-layout>
          </v-container>
        </v-app-bar>

        <v-container>
          <v-layout justify-center row wrap>
            <v-flex v-if="!filtered && messages.length === 0" xs12 class="pa-3">
              <v-alert class="card-message" type="error">
                Yahh ada error nih.. kado gagal dibuka, silahkan coba lagi nanti ya hehe
              </v-alert>
            </v-flex>
            <v-flex v-else-if="filtered && messages.length === 0" xs12 class="pa-3">
              <v-alert class="card-message" type="warning">
                Tidak ada data yang cocok
              </v-alert>
            </v-flex>
            <Stack
              ref="stack"
              :monitor-images-loaded="true"
              :column-min-width="320"
              :gutter-width="5"
              :gutter-height="5"
            >
              <StackItem v-for="(item, index) in messages" :key="index" :class="$vuetify.breakpoint.mobile ? '' : 'stack-item'">
                <MessageCard
                  :kesan="item.kesan || ''"
                  :foto="item.foto || null"
                  :video="item.video || null"
                  :dari="item.darisiapa"
                  :untuk="item.untuksiapa"
                  :pesan="item.pesan"
                  @updateLayout="updatedLayout"
                />
              </StackItem>
            </Stack>
            <v-flex xs12>
              <infinite-loading
                v-if="messages.length > 0 && !filtered"
                :distance="0"
                spinner="spiral"
                no-results="-"
                no-more=""
                error="-"
                @infinite="infiniteScroll"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import { paginate } from '@/utils'
import MessageCard from '@/components/message'

export default {
  components: {
    MessageCard
  },
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('getMessages')
    const messages = store.getters.messages
    const dataLoaded = store.getters.dataLoaded
    const page = 1
    const size = 10
    return {
      allData: messages,
      storeMessages: paginate(messages, page, 10),
      messages: paginate(messages, page, 10),
      dataLoaded,
      page,
      size
    }
  },
  data: () => ({
    appBar: false,
    toolbarSearch: false,
    StackIsLoaded: false,
    isLoaded: false,
    isLoadMore: false,
    search: '',
    filtered: false
  }),
  computed: {
    backBtn () {
      if (this.$vuetify.breakpoint.mobile) {
        if (this.toolbarSearch) {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  },
  mounted () {
    this.isLoaded = true
    this.StackIsLoaded = true
    setTimeout(() => {
      this.appBar = true
    }, 550)
  },
  methods: {
    filterData () {
      if (this.search) {
        const search = this.search.toLowerCase().trim()
        const filtered = this.allData
          .filter((el) => {
            return el.untuksiapa.toLowerCase().includes(search)
          })

        if (this.search === '') {
          this.filtered = false
          this.messages = this.storeMessages
        } else {
          this.filtered = true
          this.messages = filtered
          window.scrollTo(0, 0)
        }
      } else {
        this.filtered = false
        this.messages = this.storeMessages
      }
      this.updatedLayout()
    },
    updatedLayout () {
      if (this.$refs && this.$refs.stack) {
        this.$refs.stack.update()
      }
    },
    infiniteScroll ($state) {
      this.getNextData($state)
    },
    getNextData ($state) {
      this.isLoadMore = true
      this.page++
      setTimeout(() => {
        const next = paginate(this.allData, this.page, this.size)
        if (next.length > 1) {
          next.forEach((el) => {
            this.messages.push(el)
            this.storeMessages.push(el)
          })
          $state.loaded()
        } else {
          this.$store.dispatch('setDataLoaded', true)
          $state.loaded()
          $state.complete()
        }
        this.updatedLayout()
        this.isLoadMore = false
      }, 1500)
    },
    back () {
      this.appBar = false
      setTimeout(() => {
        this.isLoaded = false
        this.$router.push('/')
      }, 300)
    },
    toggleSearch () {
      this.toolbarSearch = !this.toolbarSearch
    }
  }
}
</script>
