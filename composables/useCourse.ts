import courseData from "./courseData";

export const useCourse = (): ICourse => {
    const chapters: IChapter[] = courseData.chapters.map((chapter) => {
        const lessons: ILesson[] = chapter.lessons.map((lesson) => ({
            ...lesson,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
        }));
        return {
            ...chapter,
            lessons,
        };
    });
    return {
        ...courseData,
        chapters,
    };
};
