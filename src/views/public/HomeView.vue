<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue';
import AppStepWizard from '@/components/AppStepWizard.vue'
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import { useServiceTypeStore } from '@/stores/service-type.store';
import { useWorkingHoursStore } from '@/stores/working-hours.store';
import { useAppointmentStore } from '@/stores/appointment.store'
import { Appointment } from '@/types/entities/Appointment'
import { getTomorowDate } from '@/composables/useDateTimeFormatter'

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

const getUnavailableDates = (fromDate: Date|null = null, toDate: Date|null = null) => {
    if (!fromDate || !toDate) {
        fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        toDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        toDate.setDate(toDate.getDate() + 7)
    }
    appointmentStore.getUnavailableDates(newAppointmentObject.serviceTypeId, fromDate, toDate)
}

const computedDisabledDays = computed(() => {
    const selectedServiceType = serviceTypes.data.find((st: any) => st.serviceTypeId === newAppointmentObject.serviceTypeId);

    const daysMapping = [
        { dayIndex: 0, isAvailable: 'isAvailableOnSunday', workingDaysIndex: 6 },
        { dayIndex: 1, isAvailable: 'isAvailableOnMonday', workingDaysIndex: 0 },
        { dayIndex: 2, isAvailable: 'isAvailableOnTuesday', workingDaysIndex: 1 },
        { dayIndex: 3, isAvailable: 'isAvailableOnWednesday', workingDaysIndex: 2 },
        { dayIndex: 4, isAvailable: 'isAvailableOnThursday', workingDaysIndex: 3 },
        { dayIndex: 5, isAvailable: 'isAvailableOnFriday', workingDaysIndex: 4 },
        { dayIndex: 6, isAvailable: 'isAvailableOnSaturday', workingDaysIndex: 5 },
    ];

    const disabledDays = daysMapping
        .filter(({ isAvailable, workingDaysIndex }) =>
            !selectedServiceType[isAvailable] || !workingDays.data[workingDaysIndex].isActive
        )
        .map(({ dayIndex }) => dayIndex);

    return disabledDays;
});

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
    const fromDate = new Date(event.year, event.month - 1, 1);
    const toDate = new Date(event.year, event.month, 0);
    
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
</script>

<template>
    <!-- Hero Section -->
    <!-- Gallery Section -->
    <!-- Book Appointment Section-->
    <div>
        <AppStepWizard
            :items="stepWizardItems"
        >
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
                            {{ item.time.slice(0,-3) }}
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
                        <label class="text-xl">
                            Email adresa
                        </label>
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
                Step 4
            </template>
        </AppStepWizard>
    </div>
</template>

<style scoped>
:deep(.p-disabled) {
    @apply text-zinc-400
}

:deep(.p-datepicker-today>.p-disabled) {
    @apply bg-white !text-amber-700 
}
</style>