<template>
	<div>
		<div class="row">
	  <div class="col s12 m5 l4">
	    <!-- <h2 class="header">Horizontal Card</h2> -->
	    <div class="card horizontal">
	      <div class="card-image">
	        <img src="http://lorempixel.com/100/190/nature/6">
	      </div>
	      <div class="card-stacked">
	        <div class="card-content">
	          <p>{{ slotData.brand }}</p>
	        </div>
	        <div class="card-action">
	          <a href="#">This is a link</a>
	        </div>
	      </div>
	    </div>
	  </div>
	  </div>

	</div>
</template>

<script>
	export default {
		props: {
			slotData: Object
		}
	}
</script>
