<script setup lang="ts">
const { chapters } = useCourse();

console.log(chapters);
</script>

<template>
    <div
        class="flex h-full min-h-screen w-full flex-col items-center bg-gray-100 p-12"
    >
        <div class="prose mb-12">
            <h1>
                <span class="font-medium">
                    Course:
                    <span class="font-bold">Mastering Nuxt 3</span>
                </span>
            </h1>
        </div>

        <div class="flex flex-grow flex-row justify-center">
            <div
                class="prose mr-4 flex min-w-[20ch] max-w-[30ch] flex-col rounded-md bg-white p-8"
            >
                <h3 class="mb-6 font-bold">Chapters</h3>
                <nav>
                    <ol class="flex flex-col gap-4 space-y-1">
                        <li v-for="chapter in chapters" :key="chapter.slug">
                            <h4 class="font-bold">{{ chapter.title }}</h4>
                            <NuxtLink
                                v-for="(lesson, index) in chapter.lessons"
                                :key="lesson.downloadUrl"
                                class="mb-2 inline-block font-medium text-slate-400 hover:text-slate-700"
                                :to="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`"
                                >{{ index + 1 }}. {{ lesson.title }}</NuxtLink
                            >
                        </li>
                    </ol>
                </nav>
            </div>

            <div class="prose w-[65ch] rounded-md bg-white p-12">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
