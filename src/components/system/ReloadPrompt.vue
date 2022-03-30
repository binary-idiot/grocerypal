<template>
	<div class="toast" v-if="offlineReady || needRefresh">
		<div class="message">
			<span v-if="offlineReady">
				Ready to work offline
			</span>
			<span v-else>
				Updates available
			</span>
		</div>
		<button v-if="needRefresh" @click="updateServiceWorker()">
			Update
		</button>
		<button @click="close">
			Close
		</button>
	</div>
</template>

<script setup lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/vue';

	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

	const close = async() => {
		offlineReady.value = false;
		needRefresh.value = false;
	}
</script>

<style module lang="scss">

</style>