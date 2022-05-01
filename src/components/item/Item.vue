<template>
	<li @click="store.deleteItem(item)">{{ item.name }}</li>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/data/item/item.model';

	import { useListStore } from '@/stores/lists'

	const props = defineProps<{
		id: string
	}>()

	const store = useListStore();
	
	const item: Item = store.getItemById(props.id)!;
</script>

<style module lang="scss">

</style>