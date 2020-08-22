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
                <v-card color="transparent" outlined class="card-transparent pa-4 text-center">
                  <v-layout justify-center align-center column wrap>
                    <v-card-title primary-title>
                      <vue-typed-js :loop="true" :type-speed="75" :back-speed="65" :start-delay="150" :strings="typing">
                        <h2>Hello <span class="typing" /></h2>
                      </vue-typed-js>
                    </v-card-title>
                    <v-card-text>
                      <p>
                        Kado Spesial dari Keluarga Mahasiswa D3 RPLA
                        <br>
                        Dibuat khusus untuk angkatan 41 D3 RPLA Telkom University
                      </p>
                    </v-card-text>
                    <v-btn color="secondary" :loading="disabledClick" :disabled="disabledClick" to="/kado" @click="disabledClick = true">
                      {{ messageClick[0] }}
                    </v-btn>
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
import particle from '@/static/images/particle'

export default {
  data: () => ({
    typing: ['World!', 'Developer!', 'D3 RPLA-41 :)', 'Informatics'],
    messageClick: [
      'Buka Kado 🎁',
      'Hampir terbuka..',
      'Kado terbuka 🎉'
    ],
    disabledClick: false,
    click: 0,
    config: {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-30, 30],
      alpha: [0.6, 0],
      body: particle(),
      scale: [0, 1.3],
      position: 'all',
      cross: 'dead',
      random: 10
    },
    isLoaded: false,
    btnKado: 'secondary'
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
  methods: {
    clicked () {
      if (this.click < 2) {
        this.click++
      }

      if (this.click >= 2) {
        this.disabledClick = true
        this.$router.push('/kado')
      }
    },
    getColor () {
      if (this.btnKado === 'primary') {
        this.btnKado = 'secondary'
      } else {
        this.btnKado = 'primary'
      }
    }
  }
}
</script>
