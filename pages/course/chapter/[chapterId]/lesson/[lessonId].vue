<script setup lang="ts">
const course = useCourse();
const route = useRoute();

const chapter: ComputedRef = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterId,
    );
});

console.log(chapter.value);

const lesson: ComputedRef = computed(() => {
    return chapter.value.lessons.find(
        (lesson: { slug: string }) => lesson.slug === route.params.lessonId,
    );
});
</script>

<template>
    <h2>Lesson</h2>
    <p>This is a lesson</p>
    <p>{{ chapter.title }}</p>
    <p>{{ lesson.title }}</p>
</template>
