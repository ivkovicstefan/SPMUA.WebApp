<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue'
import AppStepWizard from '@/components/AppStepWizard.vue'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Button from 'primevue/button'
import { useServiceTypeStore } from '@/stores/service-type.store'
import { useWorkingHoursStore } from '@/stores/working-hours.store'
import { useAppointmentStore } from '@/stores/appointment.store'
import { Appointment } from '@/types/entities/Appointment'
import {
  getTomorowDate,
  useDefaultDateFormatter,
  useDefaultTimeFormatter
} from '@/composables/useDateTimeFormatter'

const bookAppointmentSection = ref(null)

const onBookAppointmentClick = () => {
  bookAppointmentSection.value.scrollIntoView({ behavior: 'smooth' })
}

const stepWizardItems = [
  {
    stepTitle: 'Odabir usluge'
  },
  {
    stepTitle: 'Odabir termina'
  },
  {
    stepTitle: 'Kontakt podaci'
  },
  {
    stepTitle: 'Pregled rezervacije'
  }
]

const getAvailableAtDays = (item: any): string => {
  let availableAtLabel: string = 'Dostupno '

  if (
    item.isAvailableOnMonday &&
    item.isAvailableOnTuesday &&
    item.isAvailableOnWednesday &&
    item.isAvailableOnThursday &&
    item.isAvailableOnFriday &&
    item.isAvailableOnSaturday &&
    item.isAvailableOnSunday
  ) {
    availableAtLabel += 'svim danima'
  } else if (
    item.isAvailableOnMonday &&
    item.isAvailableOnTuesday &&
    item.isAvailableOnWednesday &&
    item.isAvailableOnThursday &&
    item.isAvailableOnFriday
  ) {
    availableAtLabel += 'radnim danima'
  } else if (item.isAvailableOnSaturday && item.isAvailableOnSunday) {
    availableAtLabel += 'vikendom'
  } else {
    let availableAtDaysArray = []

    if (item.isAvailableOnMonday) {
      availableAtDaysArray.push('ponedeljkom')
    }
    if (item.isAvailableOnTuesday) {
      availableAtDaysArray.push('utorkom')
    }
    if (item.isAvailableOnWednesday) {
      availableAtDaysArray.push('sredom')
    }
    if (item.isAvailableOnThursday) {
      availableAtDaysArray.push('četvrtkom')
    }
    if (item.isAvailableOnFriday) {
      availableAtDaysArray.push('petkom')
    }
    if (item.isAvailableOnSaturday) {
      availableAtDaysArray.push('subotom')
    }
    if (item.isAvailableOnSunday) {
      availableAtDaysArray.push('nedeljom')
    }

    availableAtLabel += availableAtDaysArray.join(',')
  }

  return availableAtLabel
}

const newAppointmentObject = reactive(new Appointment())
const appointmentTime = ref('')

const serviceTypeStore = useServiceTypeStore()
const { serviceTypes } = serviceTypeStore

serviceTypeStore.getServiceTypes()

const workingHoursStore = useWorkingHoursStore()
const { workingDays } = workingHoursStore

const appointmentStore = useAppointmentStore()
const { unavailableDates, availableHours } = appointmentStore

workingHoursStore.getWorkingDays()

const getUnavailableDates = (fromDate: Date | null = null, toDate: Date | null = null) => {
  if (!fromDate || !toDate) {
    fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    toDate.setDate(toDate.getDate() + 7)
  }
  appointmentStore.getUnavailableDates(newAppointmentObject.serviceTypeId, fromDate, toDate)
}

const computedDisabledDays = computed(() => {
  const selectedServiceType = serviceTypes.data.find(
    (st: any) => st.serviceTypeId === newAppointmentObject.serviceTypeId
  )

  const daysMapping = [
    { dayIndex: 0, isAvailable: 'isAvailableOnSunday', workingDaysIndex: 6 },
    { dayIndex: 1, isAvailable: 'isAvailableOnMonday', workingDaysIndex: 0 },
    { dayIndex: 2, isAvailable: 'isAvailableOnTuesday', workingDaysIndex: 1 },
    { dayIndex: 3, isAvailable: 'isAvailableOnWednesday', workingDaysIndex: 2 },
    { dayIndex: 4, isAvailable: 'isAvailableOnThursday', workingDaysIndex: 3 },
    { dayIndex: 5, isAvailable: 'isAvailableOnFriday', workingDaysIndex: 4 },
    { dayIndex: 6, isAvailable: 'isAvailableOnSaturday', workingDaysIndex: 5 }
  ]

  const disabledDays = daysMapping
    .filter(
      ({ isAvailable, workingDaysIndex }) =>
        !selectedServiceType[isAvailable] || !workingDays.data[workingDaysIndex].isActive
    )
    .map(({ dayIndex }) => dayIndex)

  return disabledDays
})

const computedDisabledDates = computed(() => {
  let disabledDates: Array<Date> = []

  if (unavailableDates.isFinished) {
    unavailableDates.data.forEach((ud: string) => {
      disabledDates.push(new Date(ud))
    })
  }

  return disabledDates
})

const onMonthChange = (event: any) => {
  const fromDate = new Date(event.year, event.month - 1, 1)
  const toDate = new Date(event.year, event.month, 0)

  getUnavailableDates(fromDate, toDate)
}

const onAppointmentDateChange = (e: Date) => {
  appointmentStore.getAvailableHours(newAppointmentObject.serviceTypeId, e)
}

const computedAvailableHours = computed(() => {
  let availableHoursArray: Array<any> = []

  availableHours.data.forEach((ah: any) => {
    availableHoursArray.push({
      time: ah
    })
  })

  return availableHoursArray
})

const computedAppointmentService = computed(() => {
  return serviceTypes.data.find((st: any) => st.serviceTypeId == newAppointmentObject.serviceTypeId)
})
</script>

<template>
  <div class="flex flex-col">
    <!-- Hero Section -->
    <div class="h-[calc(100vh-160px)] lg:h-auto flex flex-col lg:flex-row self-center overflow-hidden p-0 lg:px-48">
      <div class="px-10 py-5 lg:px-0">
        <h1 class="leading-[1] text-[2.35rem] lg:text-5xl font-semibold">
          Neka moje četkice ispričaju tvoju priču.
        </h1>
        <p class="mt-6 text-zinc-500">
          Uz svaki potez četkice otkrivam tvoju jedinstvenost i ističem ono što te čini posebnom.
        </p>
        <Button class="mt-6" label="Rezerviši svoj termin" @click="onBookAppointmentClick"></Button>
      </div>
      <img
        class="w-full h-full object-cover lg:w-auto lg:h-[60vh]"
        src="@/assets/heroimage.png"
        alt="Hero Image"
      />
    </div>
    <!-- Services Section -->
    <div class="order-2 lg:order-3 px-10 py-6 lg:px-48 flex flex-col bg-white">
      <h1 class="leading-[1] text-[2.35rem] lg:text-5xl mb-12">Usluge</h1>
      <div class="grid grid-cols-4 gap-6">
        <div v-for="item in serviceTypes.data" class="shadow-lg border-t-2 border-zinc-300 hover:border-black rounded-xl col-span-4 lg:col-span-1 flex flex-col bg-white hover:scale-105 transition duration-200 cursor-pointer">
          <div class="flex p-3 flex-col">
            <h1 class="text-xl font-semibold">{{ item.serviceTypeName }}</h1>
            <p class="text-zinc-400"></p>
            <table class="mt-3 text-sm" cellpadding="5">
                <tr>
                    <td class="w-[20px]"><i class="pi pi-money-bill"></i></td>
                    <td>{{ item.serviceTypePrice.toFixed(2) }} RSD</td>
                </tr>
                <tr>
                    <td><i class="pi pi-clock"></i></td>
                    <td>{{ item.serviceTypeDuration }} min</td>
                </tr>
                <tr>
                    <td><i class="pi pi-circle-fill text-green-500 text-sm"></i></td>
                    <td>{{ getAvailableAtDays(item) }}</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Gallery Section -->
    <div class="order-3 lg:order-2 py-6 lg:px-48 bg-white px-10">
      <div class="flex mb-12 items-center">
        <h1 class="leading-[1] text-[2.35rem] lg:text-5xl">Galerija</h1>
        <RouterLink to="/gallery" class="ml-auto">
          <Button
            label="Pogledaj sve"
            icon="pi pi-chevron-right"
            icon-pos="right"
            outlined
          ></Button>
        </RouterLink>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <video
          class="col-span-2 row-span-2 rounded-xl object-cover aspect-square"
          autoplay
          muted
          loop
        >
          <source src="@/assets/gallery-video.mp4" type="video/mp4" />
        </video>
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-2.jpg" />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-3.jpg" />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-4.jpg" />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-5.jpg" />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-6.jpg" />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-7.jpg" />
        <img
          class="rounded-xl row-span-2 col-span-2 object-cover aspect-square"
          src="@/assets/gallery-picture-1.png"
        />
        <img class="rounded-xl object-cover aspect-square" src="@/assets/gallery-picture-8.jpg" />
      </div>
      <div class="flex mt-6"></div>
    </div>
    <!-- Book Appointment Section-->
    <div ref="bookAppointmentSection" class="bg-white order-4">
      <AppStepWizard :items="stepWizardItems">
        <template #step1Content>
          <AppRadioGroup
            v-if="serviceTypes.isFinished"
            v-model:model-value="newAppointmentObject.serviceTypeId"
            :items="serviceTypes.data"
            :options="{ valueProperty: 'serviceTypeId', itemDirection: 'column' }"
          >
            <template #radioItem="{ item }">
              <div class="p-3 flex justify-between">
                <div class="flex flex-col">
                  <div class="font-semibold text-lg">{{ item.serviceTypeName }}</div>
                  <div class="text-zinc-400">{{ item.serviceTypePrice.toFixed(2) }} RSD</div>
                </div>
                <div class="self-center flex items-center">
                  <span class="pi pi-clock mr-2"></span>
                  <div>{{ item.serviceTypeDuration }} min</div>
                </div>
              </div>
            </template>
          </AppRadioGroup>
        </template>
        <template #step2Content>
          <Calendar
            v-model:model-value="newAppointmentObject.appointmentDate"
            :showOtherMonths="true"
            :selectOtherMonths="true"
            :min-date="getTomorowDate()"
            class="drop-shadow-lg w-full mb-3"
            :disabled-days="computedDisabledDays"
            :disabled-dates="computedDisabledDates"
            inline
            @month-change="onMonthChange"
            @date-select="onAppointmentDateChange"
          >
          </Calendar>
          <AppRadioGroup
            v-if="availableHours.isFinished"
            v-model:model-value="appointmentTime"
            class="z-[10]"
            :items="computedAvailableHours"
            :options="{ valueProperty: 'time', itemDirection: 'row' }"
          >
            <template #radioItem="{ item }">
              <div class="p-3 px-5 text-xl">
                {{ item.time.slice(0, -3) }}
              </div>
            </template>
          </AppRadioGroup>
        </template>
        <template #step3Content>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-xl">
                Ime
                <span class="text-red-500">*</span>
              </label>
              <InputText
                v-model="newAppointmentObject.customerFirstName"
                placeholder="Ime"
              ></InputText>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl">
                Prezime
                <span class="text-red-500">*</span>
              </label>
              <InputText
                v-model="newAppointmentObject.customerLastName"
                placeholder="Prezime"
              ></InputText>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl"> Email adresa </label>
              <InputText
                v-model="newAppointmentObject.customerEmail"
                placeholder="Email adresa"
              ></InputText>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-xl">
                Broj mobilnog telefona
                <span class="text-red-500">*</span>
              </label>
              <InputMask
                v-model="newAppointmentObject.customerPhone"
                mask="0699999999"
                placeholder="0601234567"
              ></InputMask>
            </div>
          </div>
        </template>
        <template #step4Content>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col border rounded-xl bg-white py-2 px-3">
              <h1 class="text-zinc-400">Usluga</h1>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <h1 class="font-semibold text-lg">
                    {{ computedAppointmentService.serviceTypeName }}
                  </h1>
                  <h1>{{ computedAppointmentService.serviceTypePrice.toFixed(2) }} RSD</h1>
                </div>
              </div>
            </div>
            <div class="flex flex-col border rounded-xl bg-white py-2 px-3">
              <h1 class="text-zinc-400">Termin</h1>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <h1 class="font-semibold text-lg">
                    {{
                      useDefaultDateFormatter(newAppointmentObject.appointmentDate.toDateString())
                    }}
                  </h1>
                  <h1 class="text-lg">
                    {{
                      useDefaultTimeFormatter(newAppointmentObject.appointmentDate.toDateString())
                    }}
                    - {{ '01:00' }}
                  </h1>
                </div>
              </div>
            </div>
            <div class="flex flex-col border rounded-xl bg-white py-2 px-3">
              <h1 class="text-zinc-400">Kontakt podaci</h1>
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <h1 class="font-semibold text-lg">
                    {{
                      newAppointmentObject.customerFirstName +
                      ' ' +
                      newAppointmentObject.customerLastName
                    }}
                  </h1>
                  <h1 v-show="newAppointmentObject.customerEmail.length > 0" class="text-lg">
                    <span class="pi pi-envelope mr-2"></span
                    >{{ newAppointmentObject.customerEmail }}
                  </h1>
                  <h1 class="text-lg">
                    <span class="pi pi-phone mr-2"></span>{{ newAppointmentObject.customerPhone }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </template>
      </AppStepWizard>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-disabled) {
  @apply text-zinc-400;
}

:deep(.p-datepicker-today > .p-disabled) {
  @apply bg-white !text-amber-700;
}
</style>
