<script setup lang="ts">
import AppStepWizard from '@/components/AppStepWizard.vue'

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
</script>

<template>
    <!-- Hero Section -->
    <!-- Gallery Section -->
    <!-- Book Appointment Section-->
    <div>
        <AppStepWizard
            :items="stepWizardItems">
            <template #step1Content>
                Step 1
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