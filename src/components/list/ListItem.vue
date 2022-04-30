<template>
	<li @click="store.deleteItem(item)">{{ item.name }}</li>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/models/item.model';

	import { useItemStore } from '@/stores/items'

	const props = defineProps<{
		id: string
	}>()

	const store = useItemStore();
	
	const item: Item = store.getItemById(props.id)!;
</script>

<style module lang="scss">

</style>