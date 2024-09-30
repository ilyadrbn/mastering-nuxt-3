<script setup lang="ts">
const user = useSupabaseUser();

const name: ComputedRef<string> = computed(() => {
    if (!user.value) {
        return createError({ statusCode: 404, message: "User not found" });
    }
    return user.value.user_metadata.full_name;
});

const profile: ComputedRef<string> = computed(() => {
    if (!user.value) {
        return createError({ statusCode: 404, message: "User not found" });
    }
    return user.value.user_metadata.avatar_url;
});
</script>

<template>
    <div v-if="user" class="flex items-center space-x-3 rounded bg-white p-3">
        <img
            :src="profile"
            class="h12 w-12 rounded-full border-2 border-green-500"
            alt="profile image"
        />
        <div class="text-right">
            <p class="font-medium">{{ name }}</p>
            <button class="text-sm text-slate-500 underline">Log out</button>
        </div>
    </div>
</template>
