<template>
  <div class="">
    <router-link tag="button" class="btn btn-primary" to="/">< go back </router-link>
    <button class="btn btn-danger" @click="reset">Reset</button>
    <input type="number" v-model="areaSize" @change="reset()">
    <button class="btn btn-info" @click="live()">Next step</button>
    <button class="btn btn-success" v-if="!running" @click="startLive()">Live</button>
    <button class="btn btn-danger" v-if="running" @click="stop()">Stop</button>
    <div class="volume row">
      <div class="col-3">
        <label for="volume">Intensety</label>
      </div>
      <div class="col-7">
        <input type="range" class="custom-range" min="1.5" max="10" step="0.5" id="volume" v-model="volume">
      </div>
      <div class="col-2">
        {{ volume }}
      </div>
    </div>
    <div class="container">
      <p>Alive DOT: {{ aliveDots }}</p>
      <p>Dead DOT: {{ deadDots }}</p>
      <p>All DOT: {{ aliveDots + deadDots }}</p>
      <div class="net">
        <div class="row" v-for="(row, rowKey) of dots" v-bind:key="rowKey">
          <div class="dot" v-for="(dot, dotKey) of row" v-bind:key="dotKey">
            <div class="life" v-if="dot">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  data () {
    return {
      dots: [
        [true, false],
        [false, true]
      ],
      areaSize: 20,
      intervalId: null,
      running: false,
      volume: 5
    }
  },
  computed: {
    aliveDots: function () {
      let live = 0
      this.dots.map(row => {
        live += row.filter(dot => dot).length
      })
      return live
    },
    deadDots: function () {
      let dead = 0
      this.dots.map(row => {
        dead += row.filter(dot => !dot).length
      })
      return dead
    }
  },
  mounted () {
    this.reset()
  },
  methods: {
    reset () {
      const randomInteger = (min, max) => {
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand)
        return rand
      }
      this.dots = [[]]
      for (let i = 0; i < this.areaSize; i++) {
        if (i !== 0) {
          this.dots.push([])
        }
        for (let a = 0; a < this.areaSize; a++) {
          this.dots[i].push(randomInteger(1, 10) < this.volume)
        }
      }
    },
    startLive () {
      this.intervalId = setInterval(() => {
        this.live()
      }, 100)
      this.running = true
    },
    stop () {
      clearInterval(this.intervalId)
      this.running = false
    },
    live () {
      this.dots.map((row, keyRow) => {
        row.map((dot, keyDot) => {
          this.checker({row: keyRow, dot: keyDot})
        })
      })
    },
    checker (coords) {
      const around = this.counter(coords)

      if (around > 3 || around < 2) {
        this.dots[coords.row][coords.dot] = false
      } else if ((around === 2 || around === 3) && this.dots[coords.row][coords.dot]) {

      } else if (around === 3) {
        this.dots[coords.row][coords.dot] = true
      }
      let dots = this.dots
      this.dots = [[]]
      this.dots = dots
    },
    counter (coords) {
      let lives = 0
      if (coords.row === 0 && coords.dot === 0) {
        if (this.dots[coords.row + 1][coords.dot]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
        if (this.dots[coords.row + 1][coords.dot + 1]) lives++
      } else if (coords.row === 0 && coords.dot === this.dots[0].length - 1) {
        if (this.dots[coords.row + 1][coords.dot]) lives++
        if (this.dots[coords.row + 1][coords.dot - 1]) lives++
        if (this.dots[coords.row][coords.dot - 1]) lives++
      } else if (coords.row === this.dots.length - 1 && coords.dot === 0) {
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot + 1]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
      } else if (coords.row === this.dots.length - 1 && coords.dot === this.dots[this.dots.length - 1].length - 1) {
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot - 1]) lives++
        if (this.dots[coords.row][coords.dot - 1]) lives++
      } else if (coords.row === 0) {
        if (this.dots[coords.row][coords.dot - 1]) lives++
        if (this.dots[coords.row + 1][coords.dot - 1]) lives++
        if (this.dots[coords.row + 1][coords.dot]) lives++
        if (this.dots[coords.row + 1][coords.dot + 1]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
      } else if (coords.dot === 0) {
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot + 1]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
        if (this.dots[coords.row + 1][coords.dot + 1]) lives++
        if (this.dots[coords.row + 1][coords.dot]) lives++
      } else if (coords.row === this.dots.length - 1) {
        if (this.dots[coords.row][coords.dot - 1]) lives++
        if (this.dots[coords.row - 1][coords.dot - 1]) lives++
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot + 1]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
      } else if (coords.dot === this.dots[this.dots.length - 1].length - 1) {
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot - 1]) lives++
        if (this.dots[coords.row][coords.dot - 1]) lives++
        if (this.dots[coords.row + 1][coords.dot - 1]) lives++
        if (this.dots[coords.row + 1][coords.dot]) lives++
      } else {
        if (this.dots[coords.row - 1][coords.dot - 1]) lives++
        if (this.dots[coords.row - 1][coords.dot]) lives++
        if (this.dots[coords.row - 1][coords.dot + 1]) lives++
        if (this.dots[coords.row][coords.dot + 1]) lives++
        if (this.dots[coords.row + 1][coords.dot + 1]) lives++
        if (this.dots[coords.row + 1][coords.dot]) lives++
        if (this.dots[coords.row + 1][coords.dot - 1]) lives++
        if (this.dots[coords.row][coords.dot - 1]) lives++
      }
      return lives
    }
  }
}
</script>

<style lang="css" scoped>
.goback {
  width: 100px;
  height: 20px;
}
.row {
  display: flex;
}
.dot {
  width: 10px;
  height: 10px;
  border: 1px solid black;
}
.life {
  width: 100%;
  height: 100%;
  background-color: red;
}
.volume {
  width: 400px;
}
</style>
