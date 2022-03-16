<template>
	<ul>
		<ListItem v-for="item in list" :id="item.id" />
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

	import ListItem from '@/components/list/ListItem.vue'
	
	const store = useListStore();
	const { list } = storeToRefs(store);

	const newItem: Ref<Item> = ref({id: '',name: ''});

	const addItemToList = () => {
		store.addToList(newItem.value.name);
		newItem.value.name = ''
	}
</script>

<style module lang="scss">

</style>