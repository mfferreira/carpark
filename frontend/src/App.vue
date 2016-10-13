<template>
<div id="app">

    <h1>Car Park</h1>

    <div class="row">
      <div class="col s12">
        <a class="waves-effect waves-light btn" @click="displayAllLots">All Lots</a>
        <a class="waves-effect waves-light btn" @click="displayLot">Lot</a>
        <a class="waves-effect waves-light btn" @click="displayLotHours">Lot + Hours</a>
        <a class="waves-effect waves-light btn" @click="displayInventory">Inventory</a>
      </div>
    </div>



    <div class="row">
    <div class="col s12">
      <div class="divider"></div>

      <template v-if="selectedDisplay === displays.all">
        <all-lots-table :lot-data="slots" lot="" v-bind:displayValue="displayValue"></all-lots-table>
      </template>

      <template v-if="selectedDisplay === displays.lot">
        <div class="row">
          <div class="input-field col s3">
            <input value="" id="lotId" type="text" class="validate" v-model="selectedLot">
            <label class="active" for="lotId">Lot Number</label>
          </div>
        </div>
        <all-lots-table :lot-data="slots" v-bind:lot="selectedLot" v-bind:displayValue="displayValue"></all-lots-table>
      </template>

      <template v-if="selectedDisplay === displays.lothours">
        <div class="row">
          <div class="input-field col s3">
            <input value="" id="lotId" type="text" class="validate" v-model="selectedLot">
            <label class="active" for="lotId">Lot Number *</label>
          </div>
          <div class="input-field col s3">
            <input value="" id="hours" type="text" class="validate" v-model="selectedHours">
            <label class="active" for="hours">Hours *</label>
          </div>
        </div>
        <all-lots-table :lot-data="slots" v-bind:lot="selectedLot" v-bind:hours="selectedHours" v-bind:displayValue="displayValue"></all-lots-table>
      </template>

      <template v-if="selectedDisplay === displays.inventory">
        <div class="row">
          <div class="input-field col s3">
            <input value="" id="hours" type="text" class="validate" v-model="selectedHours">
            <label class="active" for="hours">Hours *</label>
          </div>
        </div>
        <inventory-table :inventory-data="inventory" v-if="selectedHours"></inventory-table>
      </template>


    </div>
    </div>


</div>
</template>

<script>
  import allLotsTable from './components/allLotsTable.vue'
  import inventoryTable from './components/inventoryTable.vue'
  import _ from 'lodash'

  export default {
    components: {
      allLotsTable,
      inventoryTable
    },

    created () {
      this.$store.dispatch('GET_ALL_SLOTS')

      // default to display all
      this.selectedDisplay = this.displays.all
    },

    computed: {
      slots() {
        return this.$store.state.slots
      },
      inventory() {
        return this.$store.state.inventory
      },
      displayValue() {
        return !!(this.selectedLot && this.selectedHours)
      }
    },

    data () {
      return {
        displays: {
          all: 0,
          lot: 1,
          lothours: 2,
          inventory: 3,
          parkcar: 4
        },
        selectedDisplay: null,
        selectedLot: null,
        selectedHours: null,
      }
    },

    methods: {
      displayAllLots () {
        this.selectedDisplay = this.displays.all
        this.$store.dispatch('GET_ALL_SLOTS')
      },
      displayLot () {
        this.selectedDisplay = this.displays.lot
        this.$store.dispatch('GET_ALL_SLOTS')
      },
      displayLotHours () {
        this.selectedDisplay = this.displays.lothours
      },
      displayInventory () {
        this.selectedDisplay = this.displays.inventory
      },
    },

    watch: {
      selectedHours () {
        console.log("selectedHours changed:", this.selectedHours);

        if (_.isInteger(parseInt(this.selectedHours))) {
          switch (this.selectedDisplay) {
            case this.displays.inventory:
              this.$store.dispatch('GET_INVENTORY', {hours: this.selectedHours})
              break;

            default:
              if (_.isInteger(parseInt(this.selectedLot)))
                this.$store.dispatch('GET_LOTS_HOURS', {lot: this.selectedLot, hours: this.selectedHours})
                break;
          }
        }
      }
    }

  }
</script>

<style src="materialize-css/dist/css/materialize.min.css"></style>
