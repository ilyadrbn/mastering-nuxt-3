interface ILesson {
    title: string;
    slug: string;
    number: number;
    downloadUrl?: string;
    videoId: number;
    text: string;
    sourceUrl?: string;
    path: string;
}

interface IChapter {
    title: string;
    slug: string;
    number: number;
    lessons: ILesson[];
}

interface ICourse {
    title: string;
    chapters: IChapter[];
}
