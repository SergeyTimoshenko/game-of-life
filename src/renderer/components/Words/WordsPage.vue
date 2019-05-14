<template>
  <div class="">
    <input type="text" v-model="word" @change="writer">
    <div>
        <span v-for="(d, key) of chrs" :key="key">{{ d }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'words',
  data () {
    return {
      word: '',
      chrs: []
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    writer () {
      this.word.split('').map(d => {
        this.chrs.push(d)
      })
    }
  }
}
</script>

<style lang="css" scoped>

</style>
