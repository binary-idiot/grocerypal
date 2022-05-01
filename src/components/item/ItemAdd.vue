<template>
	<div :class="$style.listAdd">
		<input type="text" @keydown.enter="addItemToList()" v-model="newItem.name">
		<button @click="addItemToList()">Add</button>
	</div>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/data/item/item.model';

	import { ref } from 'vue';
	import { useListStore } from '@/stores/lists';

	const store = useListStore();

	const newItem: Ref<Item> = ref({localId: '', name: '', listId: ''});

	const addItemToList = () => {
		store.addItem(newItem.value.name);
		newItem.value.name = ''
	}
</script>

<style module lang="scss">
   .listAdd {
	   display: flex;
   }
</style>