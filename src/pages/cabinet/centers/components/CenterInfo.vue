<template>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold py-6">Center name</h1>
        <div>
            <a-input-search v-model:value="value" size="large" placeholder="Search" enter-button @search="onSearch"
                class="w-80 mr-4" />
            <button class="add-button shadow-lg"> Add Stuff </button>
        </div>
    </div>

</template>

<script script>

</script>

<style lang="scss"></style>