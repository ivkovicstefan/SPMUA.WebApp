<script setup lang="ts">
import { ref } from 'vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue';
import AppStepWizard from '@/components/AppStepWizard.vue'
import { useServiceTypeStore } from '@/stores/service-type.store';

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

const serviceTypeStore = useServiceTypeStore()
const { serviceTypes } = serviceTypeStore

serviceTypeStore.getServiceTypes()

const selectedServiceId = ref(1)
</script>

<template>
    <!-- Hero Section -->
    <!-- Gallery Section -->
    <!-- Book Appointment Section-->
    <div>
        <AppStepWizard
            v-model="selectedServiceId"
            :items="stepWizardItems"
        >
            <template #step1Content>
                <AppRadioGroup 
                    v-if="serviceTypes.isFinished"
                    v-model:modelValue="selectedServiceId"
                    :items="serviceTypes.data" 
                    :options="{ valueProperty: 'serviceTypeId' }"    
                >
                    <template #radioItem="{ item }">
                        <div class="p-3 flex justify-between">
                            <div class="flex flex-col">
                                <div class="font-semibold">{{ item.serviceTypeName }}</div>
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
                Step 2
            </template>
            <template #step3Content>
                Step 3
            </template>
            <template #step4Content>
                Step 4
            </template>
        </AppStepWizard>
    </div>
</template>