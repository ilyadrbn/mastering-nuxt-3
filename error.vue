<template>
    <NuxtLayout name="default">
        <article class="max-w-md text-center">
            <h2 class="mb-4 text-5xl font-bold">
                {{ error ? error.statusCode : "Unknown error code" }}
            </h2>
            <p class="mb-4 text-gray-500">
                {{ error ? error.message : "Something went wrong" }}
            </p>
            <button
                @click.prevent="handleError"
                class="inline-block rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
            >
                Take me home
            </button>
        </article>
    </NuxtLayout>
</template>

<script lang="ts" setup>
const error = useError();

function handleError() {
    clearError({
        redirect:
            "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3",
    });
}
</script>

<style scoped></style>
