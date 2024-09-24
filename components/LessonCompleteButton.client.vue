<template>
    <label
        class="cursor-pointer rounded px-4 py-2 font-bold text-white"
        :class="{
            'bg-green-500': lessonState,
            'bg-gray-500': !lessonState,
        }"
    >
        <input v-model="lessonState" type="checkbox" class="hidden" />
        {{ lessonState ? "Completed!" : "Mark as complete" }}
    </label>
</template>

<script lang="ts" setup>
const lessonState = defineModel<boolean>("currentLessonState", {
    default: false,
});

// function toggleLessonState() {
//     lessonState.value = !lessonState.value;
// }
</script>

<style scoped>
::selection {
    display: none;
}
</style>
