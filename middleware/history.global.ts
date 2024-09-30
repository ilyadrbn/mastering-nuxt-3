// ? global срабатывает при каждом изменении маршрута, используется например для телеметрии
// export default defineNuxtRouteMiddleware(({ path }, from) => {
//     const navHistory = useLocalStorage<string[]>("history", []);
//     navHistory.value.push(path);
// });
