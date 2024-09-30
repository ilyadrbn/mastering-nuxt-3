<template>
    <div
        class="prose flex w-full max-w-2xl flex-col rounded-lg bg-white p-4 shadow-2xl"
    >
        <h1>Log in to {{ title }}</h1>
        <button
            class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-400"
        >
            Log in with GitHub
        </button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "login",
});
const { title } = useCourse();
</script>
