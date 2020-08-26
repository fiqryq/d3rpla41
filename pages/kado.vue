<template>
  <div>
    <v-fade-transition>
      <div v-if="!isLoadedLottie" class="lottie-cover">
        <Lottie height="100%" :options="lottieOptions" @loaded="loadedLottie" />
      </div>
    </v-fade-transition>
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
                <v-btn :class="specialContentDone ? 'gift-opened' : 'gift-animation'" fab icon @click="toSpecialContent">
                  <v-icon class="gift-icon">
                    mdi-gift
                  </v-icon>
                </v-btn>
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
            <v-flex v-else-if="filtered && filteredData.length === 0" xs12 class="pa-3">
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
              <StackItem v-for="(item, index) in filtered ? filteredData : messages" :key="index" :class="$vuetify.breakpoint.mobile ? '' : 'stack-item'">
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

    <v-dialog
      v-model="specialContent"
      width="800"
    >
      <v-card v-if="specialContent" height="400" width="100%">
        <v-layout justify-center align-center wrap style="height: 100%; width: 100%">
          <v-progress-circular style="position: absolute; z-index: 0;" class="ma-auto" indeterminate color="primary" />
          <iframe
            style="z-index: 1; position: relative"
            :src="getSpecialContent"
            width="100%"
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </v-layout>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
@mixin gift-animation {
  position: absolute !important;
  animation-name: gift;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.gift {
  &-opened:hover {
    .gift-icon {
      @include gift-animation();
    }
  }
  &-animation {
    .gift-icon {
      @include gift-animation();
    }
  }
}

@keyframes gift {
  0% {
    top: -10px;
  }
  35% {
    top: -16px;
  }
  45% {
    top: -10px;
  }
  55% {
    top: -12px;
  }
  100% {
    top: -10px;
  }
}
</style>

<script>
import { paginate, getUrlFile } from '@/utils'
import MessageCard from '@/components/message'
import Lottie from '@/components/lottie'
import animationData from '@/static/lottie/6902-exploding-ribbon-and-confetti.json'

export default {
  components: {
    MessageCard,
    Lottie
  },
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('getMessages')
    const messages = store.getters.messages
    const dataLoaded = store.getters.dataLoaded
    const page = 1
    const size = 10
    return {
      allData: messages,
      messages: paginate(messages, page, 10),
      dataLoaded,
      page,
      size,
      lottieOptions: { animationData }
    }
  },
  data: () => ({
    appBar: false,
    toolbarSearch: false,
    isLoaded: false,
    isLoadMore: false,
    isLoadedLottie: false,
    search: '',
    filtered: false,
    filteredData: [],
    specialContent: false,
    specialContentDone: false,
    specialContentUrl: 'https://drive.google.com/open?id=1LkEztiM6wu72RFDjRpuYybv_3y0XZzDH'
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
    },
    getSpecialContent () {
      if (this.specialContentUrl) {
        return getUrlFile(this.specialContentUrl, 'embed')
      } else {
        return null
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => {
        this.isLoaded = true
        this.updatedLayout()
      }, 700)
      setTimeout(() => {
        this.appBar = true
      }, 1200)
    },
    loadedLottie () {
      this.isLoadedLottie = true
    },
    filterData () {
      if (this.search) {
        const search = this.search.toLowerCase().trim()
        const filtered = this.allData
          .filter((el) => {
            return el.untuksiapa.toLowerCase().includes(search)
          })

        if (this.search === '') {
          this.filtered = false
          this.filteredData = []
        } else {
          this.filtered = true
          this.filteredData = filtered
          window.scrollTo(0, 0)
        }
      } else {
        this.filtered = false
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
    },
    toSpecialContent () {
      this.specialContentDone = true
      this.specialContent = !this.specialContent
    }
  }
}
</script>
