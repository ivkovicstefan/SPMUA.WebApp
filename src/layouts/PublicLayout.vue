<script setup lang="ts">
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="bg-black text-white"> Header Content </header>
        <main class="flex-grow">
            <RouterView>
            </RouterView>
        </main>
        <footer class="bg-black text-white"> Footer Content </footer>
    </div>
</template>