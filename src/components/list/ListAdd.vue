<template>
	<div :class="$style.listAdd">
		<input type="text" @keydown.enter="addItemToList()" v-model="newItem.name">
		<button @click="addItemToList()">Add</button>
	</div>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/models/item.model';

	import { ref } from 'vue';
	import { useItemStore } from '@/stores/items';

	const store = useItemStore();

	const newItem: Ref<Item> = ref({localId: '',name: ''});

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