<template>
    <iframe
        width="100%"
        height="315"
        :src="`https://player.vimeo.com/video/${props.videoId}`"
        title="Video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
</template>

<script lang="ts" setup>
const props = defineProps<{ videoId: string }>();
</script>
