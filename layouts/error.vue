<template>
  <div v-if="isLoaded" class="no-scroll">
    <kinesis-container :duration="1500">
      <kinesis-element
        :strength="strengthKinesis"
        type="depth"
        transform-origin="50% 50%"
      >
        <kinesis-element
          :strength="strengthKinesisRotate"
          type="rotate"
        >
          <div class="full-height d-flex justify-center align-center flex-wrap">
            <v-container>
              <v-layout justify-center align-center row wrap>
                <v-card color="transparent" outlined class="card-transparent pa-4">
                  <v-layout justify-center align-center column wrap>
                    <v-alert class="mz-container--shaped" type="error">
                      <template v-if="error.statusCode === 404">
                        {{ pageNotFound }}
                      </template>
                      <template v-else>
                        {{ otherError }}
                      </template>
                    </v-alert>
                    <nuxt-link to="/">
                      Kembali
                    </nuxt-link>
                  </v-layout>
                </v-card>
              </v-layout>
            </v-container>
            <div id="particles">
              <particles-bg type="custom" :config="config" :canvas="{backgroundColor:'#ffffff'}" :bg="true" />
            </div>
          </div>
        </kinesis-element>
      </kinesis-element>
    </kinesis-container>
  </div>
</template>

<script>
import { errorPage } from '@/static/images/particle'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    pageNotFound: 'Maaf, halaman yang anda cari tidak ditemukan',
    otherError: 'Hmm.. sepertinya ada error yang terjadi, refresh & cobalagi ya..',
    config: {
      num: [1, 1],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-30, 30],
      alpha: [0.6, 0],
      body: errorPage,
      scale: [0.1, 0.2],
      position: 'all',
      cross: 'dead',
      random: 2
    },
    isLoaded: false
  }),
  computed: {
    strengthKinesis () {
      switch (this.$vuetify.breakpoint.smAndDown) {
        case true: return 0
        default: return 15
      }
    },
    strengthKinesisRotate () {
      switch (this.$vuetify.breakpoint.smAndDown) {
        case true: return 0
        default: return 3
      }
    }
  },
  mounted () {
    this.isLoaded = true
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
