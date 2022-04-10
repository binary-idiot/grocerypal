<template>
	<li @click="store.deleteItem(item.id)">{{ item.name }}</li>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/models/item.model';

	import { useItemStore } from '@/stores/items'

	const props = defineProps<{
		id: string
	}>()

	const store = useItemStore();
	store.loadItems();
	
	const item: Item = store.getItemById(props.id)!;
</script>

<style module lang="scss">

</style>