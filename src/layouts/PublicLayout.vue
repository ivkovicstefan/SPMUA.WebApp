<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/Menubar'
import Button from 'primevue/button'

const menuBarItems = ref([
  {
    label: 'Početna',
    route: '/'
  },
  {
    label: 'Galerija',
    route: '/gallery'
  }
])
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
        <template #item="{ label, item, props }">
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
          <a href="https://www.instagram.com/samardzicpetra.mua/" target="_blank"
            ><i class="pi pi-instagram !text-3xl lg:!text-2xl text-[#787878]"></i
          ></a>
        </template>
      </Menubar>
    </header>
    <main class="flex-grow">
      <RouterView> </RouterView>
    </main>
    <footer class="px-10 py-5 lg:px-48">
      <h1 class="leading-[1] text-[2.35rem] lg:text-5xl mb-6">Lokacija</h1>
      <p>Kneginje Milice 118</p>
      <p>35000, Jagodina</p>
      <Button label="Pokreni navigaciju" outlined class="mt-3"></Button>
      <h1 class="leading-[1] text-[2.35rem] lg:text-5xl my-6">Kontakt</h1>
      <p>062 1775 995</p>
      <p>petraja01@gmail.com</p>
      <p>samardzicpetra.mua</p>
      <h1 class="leading-[1] text-[2.35rem] lg:text-5xl my-6">Linkovi</h1>
      <RouterLink :to="{ name: 'admin-login' }">Administracija</RouterLink>

      <p class="mt-6">
        Copyright &copy; {{ new Date().getFullYear() }} Samardžić Petra<br />
        <span class="font-semibold"
          >Vebsajt kreirao
          <a
            class="text-amber-600"
            href="https://www.linkedin.com/in/ivkovicstefan/"
            target="_blank"
            >Stefan Ivković</a
          >.
        </span>
      </p>
    </footer>
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
  @apply w-[3rem] h-[3rem];
}

.p-menubar-end {
  @apply order-2 lg:order-3 mr-8 lg:mr-0 !ml-6;
}

.p-menuitem.p-focus > .p-menuitem-content {
  @apply !bg-transparent;
}

.p-menuitem-content:hover {
  @apply !bg-transparent;
}

.p-menuitem-content:not(:hover) > :not(.router-link-exact-active) .p-menuitem-text {
  @apply !text-[#787878];
}

.p-icon:active {
  @apply text-black;
}
</style>
