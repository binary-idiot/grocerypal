<template>
	<ul>
		<ListItem v-for="item in items" :id="item.id" />
	</ul>
	<ListAdd />
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useItemStore } from '@/stores/items';

	import ListItem from '@/components/list/ListItem.vue'
	import ListAdd from '@/components/list/ListAdd.vue';
	
	const store = useItemStore();
	store.loadItems();
	
	const { items } = storeToRefs(store);
</script>

<style module lang="scss">

</style>