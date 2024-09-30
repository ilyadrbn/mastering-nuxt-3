<template>
    <NuxtLink class="font-medium underline" :to="firstLesson">
        Go to first lesson
    </NuxtLink>
</template>

<script lang="ts" setup>
const firstLesson = useFirstLesson();
</script>
