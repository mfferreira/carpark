<template>
	<div>
  	  <table>
        <thead>
          <tr>
              <th data-field="id">Brand</th>
              <th data-field="name">License</th>
              <th data-field="price">Parking Time</th>
          </tr>
        </thead>

        <tbody v-for="slot in slotData">
          <tr>
            <td>{{ slot.brand[0].toUpperCase() + slot.brand.slice(1) }}</td>
            <td>{{ slot.licenseplate.toUpperCase() }}</td>
            <td>{{ slot.parkingtime }}</td>
          </tr>
        </tbody>
      </table>
	</div>
</template>

<script>
	export default {
		props: {
			slotData: Array
		}
	}
</script>
