<script setup lang="ts">
import Panel from 'primevue/panel'
import Badge from 'primevue/badge'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'
import { useVacationStore } from '@/stores/vacation.store'
import { useDefaultDateFormatter } from '@/composables/useDateTimeFormatter'

const vacationStore = useVacationStore()
const { vacations } = vacationStore

vacationStore.getVacations()
</script>

<template>
  <div class="flex">
    <h1 class="text-2xl text-black font-light mb-6">Godišnji odmori</h1>
  </div>
  <div class="grid grid-cols-4">
    <div class="col-span-4 lg:col-span-2">
      <Panel toggleable>
        <template #header>
          <div class="flex">
            <h1 class="font-semibold">Godišnji odmori</h1>
            <Badge
              v-if="vacations.isFinished"
              :value="vacations.data.length"
              class="ml-2"
            ></Badge>
          </div>
        </template>
        <div v-if="vacations.isFinished">
          <DataTable
            v-if="vacations.data.length > 0"
            :value="vacations.data"
            data-key="vacationId"
            class="headerless"
            striped-rows
            :paginator="vacations.data.length > 10"
            :rows="10"
          >
            <Column field="vacationName"></Column>
            <Column>
              <template #body="slotProps">
                <div class="text-center">
                  {{ useDefaultDateFormatter(slotProps.data.startDate) }}
                </div>
              </template>
            </Column>
            <Column>
              <template #body>
                <div class="text-center">
                  -
                </div>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <div class="text-center">
                  {{ useDefaultDateFormatter(slotProps.data.endDate) }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="vacations.isLoading">
          <ProgressSpinner
            style="height: 50px; width: 50px"
            strokeWidth="4"
            animationDuration=".5s"
          />
        </div>
      </Panel>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-panel-content) {
  @apply p-0;
}

:deep(.headerless .p-datatable-thead) {
  @apply hidden;
}
</style>