import courseData from "./courseData";

interface ILesson {
    title: string;
    slug: string;
    number: number;
    path: string;
    downloadUrl?: string;
    sourceUrl?: string;
    videoId?: number;
    text?: string;
}

interface IChapter {
    id?: number;
    title: string;
    slug: string;
    number: number;
    lessons: ILesson[];
}

interface ICourse {
    title: string;
    chapters: IChapter[];
}

const useCourse = (): ICourse => {
    return {
        ...courseData,
        chapters: courseData.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) => ({
                ...lesson,
                path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
            })),
        })),
    };
};

export { useCourse, type ILesson, type IChapter, type ICourse };
