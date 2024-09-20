<template>
    <p>{{ ($route as any).params.chapterId }}</p>
    <p>{{ ($route as any).params.lessonId }}</p>
    <p></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {};
    },
});
</script>

<style scoped></style>
