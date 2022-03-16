<template>
	<h1>Shopping Cart</h1>
	<ul>
		<li v-for="item in list">
			{{ item.name }}
		</li>
	</ul>
	<input type="text" @keydown.enter="addItemToList()" v-model="newItem.name">
	<button @click="addItemToList()">Add</button>
</template>

<script setup lang="ts">
	import type { Ref } from 'vue';
	import type { Item } from '@/models/item.model';

	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useListStore } from '@/stores/list';
	
	const store = useListStore();
	const { list } = storeToRefs(store);

	let newItem: Ref<Item> = ref({name: ''});

	const addItemToList = () => {
		store.addToList(newItem.value.name);
		newItem.value.name = ''
	}
</script>

<style>
</style>