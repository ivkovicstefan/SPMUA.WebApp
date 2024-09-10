<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import Menubar from 'primevue/Menubar'
import PanelMenu from 'primevue/panelmenu'
import Avatar from 'primevue/avatar'
import router from '@/router'

const authStore = useAuthStore()

const computedAdminInitials = computed(() => {
  const nameWords = authStore.admin.fullName.split(' ')

  return nameWords[0][0] + nameWords[1][0]
})

const sideMenuItems = ref([
  // {
  //   label: 'Kontrolna tabla',
  //   icon: 'pi pi-home',
  //   to: { name: 'admin-dashboard' }
  // },
  // {
  //   label: 'Kalendar',
  //   icon: 'pi pi-calendar',
  //   to: { name: 'admin-calendar' }
  // },
  {
    label: 'Rezervacije',
    icon: 'pi pi-check-circle',
    to: { name: 'admin-reservations' }
  },
  {
    label: 'Usluge',
    icon: 'pi pi-tags',
    to: { name: 'admin-services' }
  },
  {
    label: 'Radno vreme',
    icon: 'pi pi-clock',
    to: { name: 'admin-working-hours' }
  },
  {
    label: 'Godišnji odmori',
    icon: 'pi pi-sun',
    to: { name: 'admin-vacations' }
  }
])

const isMobileNavigationMenuVisible = ref(false)

const toggleMobileNavigationMenu = () => {
  isMobileNavigationMenuVisible.value = !isMobileNavigationMenuVisible.value
}

const computedMobileNavigationClassList = computed(() => {
  return isMobileNavigationMenuVisible.value ? [] : ['hidden']
})

const onLogutClick = () => {
  authStore.logout()

  router.push({ name: 'admin-login' })
}
</script>
<template>
  <div class="flex relative h-screen">
    <div class="hidden p-6 lg:flex w-1/4 flex-col bg-white p-3 border-r">
      <img src="@/assets/logo-light.png" class="h-[120px] self-center mb-6" />
      <PanelMenu :model="sideMenuItems"> </PanelMenu>
      <div class="flex mt-auto">
        <Avatar :label="computedAdminInitials" size="large" class="self-center"></Avatar>
        <div class="flex flex-col justify-between ml-3">
          <h1 class="text-lg self-center">{{ authStore.admin.fullName }}</h1>
          <button
            class="text-left text-sm text-gray-400 hover:text-gray-600 transition"
            @click="onLogutClick"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile screen -->
    <div
      class="absolute h-full w-full z-[3] p-6 lg:hidden flex flex-col bg-white p-3 border-r"
      :class="computedMobileNavigationClassList"
    >
      <div class="flex mt-3 mb-10">
        <div class="flex mt-auto">
          <Avatar :label="computedAdminInitials" size="xlarge" class="self-center"></Avatar>
          <div class="flex flex-col justify-between ml-3">
            <h1 class="text-2xl self-center">{{ authStore.admin.fullName }}</h1>
            <button
              class="text-left text-gray-400 hover:text-gray-600 transition"
              @click="onLogutClick"
            >
              Odjavi se
            </button>
          </div>
        </div>
        <button class="ml-auto" @click="toggleMobileNavigationMenu">
          <i class="pi pi-times !text-2xl"></i>
        </button>
      </div>
      <PanelMenu
        :model="sideMenuItems"
        :pt="{ headerContent: { onclick: () => toggleMobileNavigationMenu() } }"
      ></PanelMenu>
    </div>
    <div class="flex-grow flex flex-col">
      <Menubar>
        <template #start>
          <img src="@/assets/logo-light.png" class="lg:hidden h-[90px] my-3 self-center" />
        </template>
        <template #end>
          <button class="lg:hidden" @click="toggleMobileNavigationMenu">
            <i class="pi pi-bars !text-2xl"></i>
          </button>
        </template>
      </Menubar>
      <div class="flex-grow bg-zinc-50 p-6 overflow-y-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  @apply !h-[100%];
}
.p-menubar {
  @apply border-b justify-between px-6 py-2 lg:py-4 rounded-none lg:hidden;
}

:deep(.p-menubar-end) {
  @apply m-0;
}

:deep(.p-panelmenu-header-content) {
  @apply lg:!border-0 py-1 lg:p-0;
}

:deep(.p-panelmenu-header-content:hover) {
  @apply !bg-transparent;
}

:deep(.p-panelmenu-header-content:hover :is(.p-menuitem-text, .p-menuitem-icon)) {
  @apply !text-gray-600 transition;
}

:deep(.p-panelmenu-header-action) {
  @apply !py-4 lg:!px-0;
}

:deep(.router-link-active > :is(.p-menuitem-text, .p-menuitem-icon)) {
  @apply !text-black;
}

:deep(.p-menuitem-text) {
  @apply font-semibold;
}
</style>
