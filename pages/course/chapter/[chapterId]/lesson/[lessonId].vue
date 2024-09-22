<script lang="ts" setup>
import type { IChapter, ILesson } from "~/composables/useCourse";

const course = useCourse();
const route = useRoute();

const chapter: ComputedRef<IChapter | null> = computed(() => {
    return (
        course.chapters.find(
            (chapter) => chapter.slug === route.params.chapterId,
        ) ?? null
    );
});

const lesson: ComputedRef<ILesson | null> = computed(() => {
    return (
        chapter.value?.lessons.find(
            (lesson: { slug: string }) => lesson.slug === route.params.lessonId,
        ) ?? null
    );
});

const titleMeta: ComputedRef<string> = computed(() => {
    return `${chapter.value?.title} - ${lesson.value?.title}`;
});

const nameMeta: ComputedRef<string> = computed(() => {
    return lesson.value?.title ?? "";
});

/* ? Set page meta tags, title etc...
 * @see https://nuxt.com/docs/getting-started/seo-meta#usehead */
useHead({
    title: titleMeta.value,
    meta: [
        {
            name: nameMeta.value,
        },
    ] as object[],
});

/* ?[
?       [false, false, false],
?       [false, false, false, false],
?       [false, false , false]
    ?] */
const lessonsState: Ref<boolean[][]> = useState("lessonsState", () => {
    return course.chapters.map((chapter) => {
        return chapter.lessons.map(() => false);
    });
});
</script>
<template>
    <div>
        <p class="mb-1 mt-0 font-bold uppercase text-slate-400">
            Lesson {{ chapter?.number }} - {{ lesson?.number }}
        </p>
        <h2 class="m-0 text-3xl font-bold">{{ lesson?.title }}</h2>
        <div class="mb-8 mt-2 flex space-x-4">
            <NuxtLink
                v-if="lesson?.sourceUrl"
                class="text-md text-grey-500 font-normal underline hover:text-blue-500"
                :to="lesson.sourceUrl"
                target="_blank"
            >
                Download Source Code
            </NuxtLink>
            <NuxtLink
                v-if="lesson?.downloadUrl"
                class="text-md text-grey-500 font-normal underline hover:text-blue-500"
                :to="lesson.downloadUrl"
                target="_blank"
            >
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer v-if="lesson?.videoId" :video-id="lesson.videoId" />
        <p class="mb-4">{{ lesson?.text }}</p>

        <LessonCompleteButton
            v-if="lesson && chapter"
            v-model:current-lesson-state="
                lessonsState[chapter.number - 1][lesson.number - 1]
            "
        />
    </div>
</template>
