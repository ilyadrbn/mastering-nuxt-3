<template>
    <NuxtLayout name="default">
        <article class="max-w-md text-center">
            <h2 class="mb-4 text-5xl font-bold">{{ error.statusCode }}</h2>
            <p class="mb-4 text-gray-500">{{ error.message }}</p>
            <NuxtLink
                to="/"
                class="inline-block rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
            >
                Take me home
            </NuxtLink>
        </article>
    </NuxtLayout>
</template>

<script lang="ts" setup>
defineProps(["error"]);
// useHead(() => ({
//     status: 404,
//     title: "Page not found",
// }));
</script>

<style scoped></style>
