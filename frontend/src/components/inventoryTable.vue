<template>
	<div>
      <div class="row">
  	  <table>
        <thead>
          <tr>
              <th data-field="brand">Cars</th>
              <th data-field="license">Value</th>
              <th data-field="time">Discount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{ inventoryData.totalAmountOfCars }}</td>
            <td>{{ inventoryData.value }}</td>
            <td>{{ inventoryData.discountInCents }}</td>
          </tr>
        </tbody>
      </table>
      </div>
	</div>
</template>

<script>
	export default {
		props: {
			inventoryData: Object
		}
	}
</script>
