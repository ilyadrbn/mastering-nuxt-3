<template>
    <div>
        <p class="mb-1 mt-0 font-bold uppercase text-slate-400">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <h2 class="m-0 text-3xl font-bold">{{ lesson.title }}</h2>
        <div class="mb-8 mt-2 flex space-x-4">
            <NuxtLink
                v-if="lesson.sourceUrl"
                class="text-md text-grey-500 font-normal underline hover:text-blue-500"
                :to="lesson.sourceUrl"
                target="_blank"
            >
                Download Source Code
            </NuxtLink>
            <NuxtLink
                v-if="lesson.downloadUrl"
                class="text-md text-grey-500 font-normal underline hover:text-blue-500"
                :to="lesson.downloadUrl"
                target="_blank"
            >
                Download Video
            </NuxtLink>
        </div>
        <VideoPlayer
            v-if="lesson.videoId"
            :video-id="lesson.videoId.toString()"
        />
        <p class="mb-4">{{ lesson.text }}</p>
        <!-- ? https://nuxt.com/docs/guide/concepts/rendering -->
        <!-- ? https://nuxt.com/docs/api/components/client-only -->
        <!-- я так понимаю <ClientOnly /> отключает сср для этого компонента и рендерит его на стороне клиента и по итогу отключает гидратацию. т.е. компонент грузится как в обычной SPA. Можно добавить в имя компонента  .client, будет то же самое "LessonCompleteButton.client.vue" -->
        <!-- <ClientOnly> -->
        <LessonCompleteButton
            v-if="lesson && chapter"
            v-model:current-lesson-state="
                lessonsState[chapter.number - 1][lesson.number - 1]
            "
        />
        <!-- </ClientOnly> -->
    </div>
</template>

<script lang="ts" setup>
import type { RemovableRef } from "@vueuse/core";

const course = useCourse();
const route = useRoute();

definePageMeta({
    validate: async (route) => {
        const chapter: ComputedRef<IChapter> = computed(() => {
            return course.chapters.find(
                (chapter) => chapter.slug === route.params.chapterId,
            )!;
        });

        if (!chapter) {
            throw createError({
                statusCode: 404,
                message: "Chapter not found",
            });
        }

        const lesson: ComputedRef<ILesson> = computed(() => {
            return chapter.value?.lessons.find(
                (lesson: { slug: string }) =>
                    lesson.slug === route.params.lessonId,
            )!;
        });
        if (!lesson) {
            throw createError({
                statusCode: 404,
                message: "Lesson not found",
            });
        }

        return true;
    },
});

const chapter: ComputedRef<IChapter> = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterId,
    )!;
});

const lesson: ComputedRef<ILesson> = computed(() => {
    return chapter.value?.lessons.find(
        (lesson: { slug: string }) => lesson.slug === route.params.lessonId,
    )!;
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
            property: "description",
            content: titleMeta.value,
        },
    ],
});

/* ?[
?       [false, false, false],
?       [false, false, false, false],
?       [false, false , false]
    ?] */

const lessonsState: RemovableRef<boolean[][]> = useLocalStorage(
    "lessonsState",
    course.chapters.map((chapter) => {
        return chapter.lessons.map(() => false);
    }),
);

// ? useState() - nuxt composable. its like session storage
// ? useLocalStorage() - vueuse composable. written into localstorage
</script>
