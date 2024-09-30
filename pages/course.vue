<template>
    <main>
        <div class="prose mb-12">
            <h1>
                <span class="font-medium">
                    <span class="font-bold">{{ title }}</span>
                </span>
            </h1>
        </div>

        <div class="flex flex-grow flex-row justify-center">
            <header
                class="prose mr-4 flex min-w-[20ch] max-w-[30ch] flex-col rounded-md bg-white p-8"
            >
                <h3 class="mb-6 font-bold">Chapters</h3>
                <nav>
                    <ol class="flex flex-col gap-4 space-y-1">
                        <li v-for="chapter in chapters" :key="chapter.slug">
                            <h4 class="font-bold">{{ chapter.title }}</h4>
                            <NuxtLink
                                v-for="(lesson, index) in chapter.lessons"
                                :key="lesson.slug"
                                class="mb-2 inline-block font-medium hover:text-blue-500"
                                :to="lesson.path"
                                :class="
                                    lesson.slug ===
                                    ($route as any).params.lessonId
                                        ? 'text-blue-500'
                                        : 'text-gray-500'
                                "
                                >{{ index + 1 }}. {{ lesson.title }}
                            </NuxtLink>
                        </li>
                    </ol>
                </nav>
            </header>

            <div class="prose w-[65ch] rounded-md bg-white p-12">
                <!-- ? В случае ошибки внутри NuxtPage, NuxtErrorBoundary покажет новый темплейт, темплейт обязательно должен быть со слотом error https://nuxt.com/docs/api/components/nuxt-error-boundary-->
                <NuxtErrorBoundary>
                    <NuxtPage />
                    <template #error="{ error }">
                        <div class="prose">
                            <h3>Something went wrong</h3>
                            <p>{{ error }}</p>
                        </div>
                        <button
                            class="rounded bg-green-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-green-400"
                            @click.prevent="resetError(error)"
                        >
                            Try again
                        </button>
                    </template>
                </NuxtErrorBoundary>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import type { RouteRecordInfo } from "vue-router";
import type { NuxtError } from "#app";

// ? можно указать лэйаут так, а можно внутри app.vue файла в аттрибуте name
definePageMeta({
    layout: "default",
});

const { chapters, title } = useCourse();
const firstLesson = useFirstLesson();

async function resetError(error: NuxtError & { value: null }) {
    // ? что-то типо router.push() из vue router https://nuxt.com/docs/api/utils/navigate-to,
    // ? только обрабатывает и серверные ошибки, а не только клиентские
    await navigateTo(firstLesson.path, {
        redirectCode: 301,
    });
    error.value = null;
}
</script>
