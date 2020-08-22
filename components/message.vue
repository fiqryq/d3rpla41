<template>
  <div v-if="isActive" class="pa-3">
    <v-card outlined class="card-message">
      <v-img
        v-if="photoVisible && getFoto()"
        v-ripple
        :src="getFoto()"
        :lazy-src="getFoto()"
        class="grey lighten-3 media-card"
        max-height="250"
        min-height="250"
        contain
        @click="togglePlayer"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-img
        v-else-if="!photoVisible && getVideo()"
        v-ripple
        :src="getVideo()"
        :lazy-src="getVideo()"
        class="grey lighten-3 media-card"
        max-height="250"
        height="250"
        contain
        gradient="to bottom, rgba(0,0,0,0), rgba(0, 0, 0, .6)"
        @click="togglePlayer"
      >
        <v-layout style="height: 100%" justify-center align-center row wrap>
          <v-icon color="white" large>
            mdi-play
          </v-icon>
        </v-layout>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>

      <v-card-title primary-title>
        <span class="text-caption">
          Untuk:
        </span>
        <div class="card-title-container">
          {{ untuk }}
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text style="position: relative">
        <div style="position: absolute; top: -20px; right: 16px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap">
          <v-btn
            v-if="getFoto() !== null"
            class="mx-1"
            color="primary"
            fab
            small
            outlined
            :disabled="photoVisible"
            style="background: #ffffff"
            @click="togglePhotoVisible"
          >
            <v-icon small>
              mdi-image
            </v-icon>
          </v-btn>
          <v-btn
            v-if="getVideo() !== null"
            class="mx-1"
            color="primary"
            fab
            small
            outlined
            :disabled="!photoVisible"
            style="background: #ffffff"
            @click="togglePhotoVisible"
          >
            <v-icon small>
              mdi-video
            </v-icon>
          </v-btn>
        </div>
        <div class="card-text-container">
          <b>Dari:</b> {{ dari }}
          <br>
          <template v-if="kesan">
            <b>Kesan:</b> {{ kesan }}<br>
          </template>
          <b>Pesan:</b> {{ pesan }}
        </div>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="player"
      width="800"
    >
      <v-card v-if="player" height="450" width="100%">
        <v-layout justify-center align-center wrap style="height: 100%; width: 100%">
          <v-progress-circular style="position: absolute; z-index: 0;" class="ma-auto" indeterminate color="primary" />
          <iframe
            style="z-index: 1; position: relative"
            :src="photoVisible ? getFoto('embed') : getVideo('embed')"
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
.media-card {
  cursor: pointer;
}
.card-title-container {
  position: relative;
  max-height: 100px;
  overflow: auto;
  width: 100%;
}
.card-text-container {
  position: relative;
  max-height: 350px;
  overflow: auto;
}
</style>

<script>
import { getUrlFile } from '@/utils'

export default {
  props: {
    kesan: {
      type: String,
      default: ''
    },
    pesan: {
      type: String,
      default: ''
    },
    dari: {
      type: String,
      default: ''
    },
    untuk: {
      type: String,
      default: ''
    },
    foto: {
      type: String,
      default: null
    },
    video: {
      type: String,
      default: null
    }
  },
  data: () => ({
    photoVisible: true,
    player: false,
    isActive: true
  }),
  mounted () {
    this.initPhotoVisible()
  },
  updated () {
    this.$emit('updateLayout')
  },
  methods: {
    getFoto (format = 'thumbnail') {
      if (this.foto !== null) {
        return getUrlFile(this.foto, format)
      } else {
        return null
      }
    },
    getVideo (format = 'thumbnail') {
      if (this.video !== null) {
        return getUrlFile(this.video, format)
      } else {
        return null
      }
    },
    initPhotoVisible () {
      if (this.getFoto()) {
        this.photoVisible = true
      } else {
        this.photoVisible = false
      }
    },
    togglePhotoVisible () {
      this.photoVisible = !this.photoVisible
    },
    togglePlayer () {
      this.player = !this.player
    }
  }
}
</script>
