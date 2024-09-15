<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/Menubar'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useWorkingHoursStore } from '@/stores/working-hours.store';

const workingHoursStore = useWorkingHoursStore()
const { workingDays } = workingHoursStore

workingHoursStore.getWorkingDays()

const menuBarItems = ref([
  {
    label: 'Početna',
    route: '/'
  },
  {
    label: 'Galerija',
    route: '/gallery'
  },
  {
    label: 'O meni',
    route: '/about'
  }
])
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="px-10 py-5 xl:px-48">
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
    <footer class="flex flex-col px-10 py-5 xl:px-48 mt-6">
      <div class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        <div class="flex order-1 md:order-3 lg:order-2 flex-col">
          <h1 class="text-[2.35rem] lg:text-5xl mb-6">Lokacija</h1>
          <p>Kneginje Milice 118</p>
          <p>35000, Jagodina</p>
          <a href="https://www.google.com/maps/place/Kneginje+Milice+118,+Jagodina+35000/@43.9743832,21.2643638,16.16z/data=!4m6!3m5!1s0x4756c4112e70f4d1:0xeec958f3e799216a!8m2!3d43.9743556!4d21.2648839!16s%2Fg%2F11kbm5zpjj?entry=ttu" target="_blank">
            <img src="@/assets/map-view.png" class="rounded-lg w-[100%] lg:w-[80%] md:hidden lg:block"/>
          </a>
          <Button label="Pokreni navigaciju" outlined class="mt-3 lg:!hidden"></Button>
        </div>
        <div class="flex order-1 md:order-2 lg:order-3 flex-col">
          <h1 class="text-[2.35rem] lg:text-5xl mb-6">Radno vreme</h1>
          <div v-if="workingDays.isFinished">
            <table class="text-center">
              <tr v-for="(item, index) in workingDays.data" :key="index">
                <td class="pr-3">
                  <i class="block w-[0.25em] h-[1em] bg-black rounded" :class="[item.isActive ? 'bg-green-500' : 'bg-zinc-300']"></i>
                </td>
                <td class="text-left pr-3">{{ item.workingDayName }}</td>
                <td colspan="3" v-if="!item.isActive" class="text-sm px-3">ZATVORENO</td>
                <td v-if="item.isActive" class="px-3">{{ item.startTime.slice(0, -3) }}</td>
                <td v-if="item.isActive">-</td>
                <td v-if="item.isActive" class="px-3">{{ item.endTime.slice(0, -3) }}</td>
              </tr>
            </table>
          </div>
          <div v-if="workingDays.isLoading">
            <ProgressSpinner
              class="mr-auto ml-auto"
              style="height: 50px; width: 50px"
              strokeWidth="4"
              animationDuration=".5s"
            >
            </ProgressSpinner>
          </div>
        </div>
        <div class="flex order-2 md:order-1 flex-col">
          <h1 class="text-[2.35rem] lg:text-5xl mb-6">Kontakt</h1>
          <table class="table-auto">
            <tr>
              <td class="w-[2em]"><i class="pi pi-phone"></i></td>
              <td><a class="hover:text-gold-600" href="tel:062 1775 995">062 1775 995</a></td>
            </tr>
            <tr>
              <td><i class="pi pi-envelope"></i></td>
              <td><a class="hover:text-gold-600" href="mailto:petraja01@gmail.com">petraja01@gmail.com</a></td>
            </tr>
            <tr>
              <td><i class="pi pi-instagram"></i></td>
              <td><a class="hover:text-gold-600" href="https://www.instagram.com/samardzicpetra.mua/" target="_blank">samardzicpetra.mua</a></td>
            </tr>
          </table>
          <h1 class="text-[2.35rem] lg:text-5xl my-6">Linkovi</h1>
          <RouterLink class="hover:text-gold-600" :to="{ name: 'admin-reservations' }">Administracija</RouterLink>
          <RouterLink class="hover:text-gold-600" :to="{ name: 'reservation-status' }">Provera statusa rezervacije</RouterLink>
        </div>
      </div>
      <hr class="my-6">
      <div class="flex flex-col gap-1 lg:flex-row mb-3 justify-start lg:mr-auto lg:ml-auto">
        <p>
          Copyright &copy; {{ new Date().getFullYear() }} Samardžić Petra<br />
        </p>
        <span class="hidden lg:inline-block">•</span>
        <p>
          Vebsajt kreirao
            <a
              class="text-gold-600"
              href="https://www.linkedin.com/in/ivkovicstefan/"
              target="_blank"
              >Stefan Ivković</a
            >
        </p>
      </div>
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
