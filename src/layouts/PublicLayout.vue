<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/Menubar'

const menuBarItems = ref([
    {
        label: 'Početna',
        route: '/'
    }
]);
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <header class="px-10 py-5 lg:px-48">
            <Menubar :model="menuBarItems">
                <template #start>
                    <router-link to="/">
                        <img alt="logo" src="@/assets/logo-light.png" class="h-[120px]" />
                    </router-link>
                </template>
                <template #item="{ label, item, props, root }">
                    <router-link v-if="item.route" v-slot="routerProps" :to="item.route">
                        <a :href="routerProps.href" v-bind="props.action">
                            <span v-bind="props.icon" />
                            <span v-bind="props.label">{{ label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                    </a>
                </template>
                <template #end>
                    <a href="https://www.instagram.com/samardzicpetra.mua/" target="_blank"><i class="pi pi-instagram !text-3xl lg:!text-2xl text-[#787878]"></i></a>
                </template>
            </Menubar>
        </header>
        <main class="flex-grow">
            <RouterView>
            </RouterView>
        </main>
        <footer class="bg-black text-white"> Footer Content </footer>
    </div>
</template>

<style>
.p-menubar {
    @apply border-0 justify-between;
}

.p-menubar-start {
    @apply order-1 !mr-auto;
}

.p-menubar-root-list {
    @apply order-2;
}

.p-menubar-button {
    @apply order-3 hover:!bg-transparent;
}

.p-menubar-button > svg {
    @apply w-[3rem] h-[3rem]
}

.p-menubar-end {
    @apply order-2 lg:order-3 mr-8 lg:mr-0 !ml-6;
}

.p-menuitem.p-focus > .p-menuitem-content {
    @apply !bg-transparent
}

.p-menuitem-content:hover {
    @apply !bg-transparent
}

.p-menuitem-content:not(:hover)>:not(.router-link-exact-active) .p-menuitem-text {
    @apply !text-[#787878]
}

.p-icon:active {
    @apply text-black;
}
</style>