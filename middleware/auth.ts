export default defineNuxtRouteMiddleware(({ params }, from) => {
    if (params.chapterId === "1-chapter-1") {
        return;
    }
    return navigateTo("/login", {
        redirectCode: 301,
    });
});
