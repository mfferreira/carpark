<template lang="pug">
  div(id="app")
    h1 CarPark
    <!-- hr -->

    slot-display(:slot-data="slots")

</template>

<script>
  import slotDisplay from './components/slotTable.vue'
  export default {
    components: {
      slotDisplay
    },
    created () {
      this.$store.dispatch('GET_ALL_SLOTS')
    },
    computed: {
      slots() {
        return this.$store.state.slots
      }
    }
  }
</script>

<style src="materialize-css/dist/css/materialize.min.css"></style>
