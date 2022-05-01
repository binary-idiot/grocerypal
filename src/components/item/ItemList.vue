<template>
	<ul>
		<ListItem v-for="item in items" :id="item.localId" />
	</ul>
	<ListAdd />
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useListStore } from '@/stores/lists';

	import ListItem from '@/components/list/ListItem.vue'
	import ListAdd from '@/components/list/ListAdd.vue';
	
	const store = useListStore();
	store.loadItems();
	
	const { items } = storeToRefs(store);
</script>

<style module lang="scss">

</style>