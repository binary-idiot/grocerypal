<template>
	<li>{{ item.name }}</li>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/models/item.model';

	import { useListStore } from '@/stores/list'

	const props = defineProps<{
		id: string
	}>()

	const store = useListStore();
	
	const item: Item = store.getItemById(props.id)!;
</script>

<style module lang="scss">

</style>