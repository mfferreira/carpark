<template>
	<div>
      <div class="row">
  	  <table>
        <thead>
          <tr>
              <th data-field="brand">Brand</th>
              <th data-field="license">License</th>
              <th data-field="time">Parking Time</th>
              <th data-field="lot">Lot</th>
              <template v-if="displayValue">
                <th data-field="value">Value</th>
                <th data-field="discount">Discount</th>
              </template>
          </tr>
        </thead>

        <tbody v-for="slot in lotData">
          <tr v-if="slot.parkinglotid === lot || lot === null || lot === ''">
            <td>{{ slot.brand[0].toUpperCase() + slot.brand.slice(1) }}</td>
            <td>{{ slot.licenseplate.toUpperCase() }}</td>
            <td>{{ slot.parkingtime }}</td>
            <td>{{ slot.parkinglotid }}</td>
            <template v-if="displayValue">
              <td>{{ slot.value }} </td>
              <td>{{ slot.discountInCents }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      </div>
	</div>
</template>

<script>
	export default {
		props: {
			lotData: Array,
      lot: [String, Number],
      displayValue: {
        type: Boolean,
        default: false
      },
      discount: {
        type: [String, Number],
        default: 0
      }
		}
	}
</script>
