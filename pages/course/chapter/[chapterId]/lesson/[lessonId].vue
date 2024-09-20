<script setup lang="ts">
const course = useCourse();
const route = useRoute();

interface ILesson {
    downloadUrl?: string;
    sourceUrl?: string;
    slug: string;
    number: number;
    text: string;
    title: string;
    videoId?: number;
}

interface IChapter {
    title: string;
    slug: string;
    number: number;
    lessons: ILesson[];
}

const chapter: ComputedRef = computed((): IChapter | null => {
    return (
        course.chapters.find(
            (chapter) => chapter.slug === route.params.chapterId,
        ) ?? null
    );
});

const lesson: ComputedRef = computed((): ILesson | null => {
    return (
        chapter.value.lessons.find(
            (lesson: { slug: string }) => lesson.slug === route.params.lessonId,
        ) ?? null
    );
});
</script>

<template>
    <div>
        <p class="mb-1 mt-0 font-bold uppercase text-slate-400">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <h2 class="m-0 text-3xl font-bold">{{ lesson.title }}</h2>
        <div class="mb-8 mt-2 flex space-x-4">
            <a
                v-if="lesson.sourceUrl"
                class="text-md text-grey-500 font-normal"
                :href="lesson.sourceUrl"
            >
                Download Source Code
            </a>
            <a
                v-if="lesson.downloadUrl"
                class="text-md text-grey-500 font-normal underline hover:text-blue-500"
                :href="lesson.downloadUrl"
            >
                Download Video
            </a>
        </div>
        <VideoPlayer v-if="lesson.videoId" :video-id="lesson.videoId" />
        <p>{{ lesson.text }}</p>
    </div>
</template>
