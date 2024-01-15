<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import Badge from 'primevue/badge'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import InlineMessage from 'primevue/inlinemessage'
import { useVacationStore } from '@/stores/vacation.store'
import { useDefaultDateFormatter, getTomorowDate } from '@/composables/useDateTimeFormatter'
import { DialogMode } from '@/types/Enums'
import { Vacation } from '@/types/entities/Vacation'

const vacationStore = useVacationStore()
const { vacations, postVacation } = vacationStore

vacationStore.getVacations()

const vacationRecord = ref(new Vacation())
const vacationDates = ref()

watch(vacationDates, (newValue) => {
  vacationRecord.value.startDate = newValue[0]

  if (!newValue[1]) {
    vacationRecord.value.endDate = newValue[0]
  }
  else {
    vacationRecord.value.endDate = newValue[1]
  }
})

const vacationDialogMode = ref(0)
const isVacationDetailDialogVisible = ref(false)

const computedVacationDetailDialogHeader = computed(() => {
  switch (vacationDialogMode.value) {
    case DialogMode.Add:
      return 'Novi odmor'
    case DialogMode.Edit:
      return 'Izmeni odmor'
    default: 
      return ''
  }
})

const onNewVacationClick = (): void => {
  vacationDialogMode.value = DialogMode.Add
  isVacationDetailDialogVisible.value = true
}

const onSaveVacationClick = async (): Promise<void> => {
  if (vacationDialogMode.value == DialogMode.Add) {
    await vacationStore.createVacation(vacationRecord.value)
    await vacationStore.getVacations()
  }
  else if (vacationDialogMode.value == DialogMode.Edit) {
    await vacationStore.updateVacation(vacationRecord.value)
    await vacationStore.getVacations()
  }

  isVacationDetailDialogVisible.value = false
}

const onEditVacationRowClick = (e: Vacation): void => {
  vacationDialogMode.value = DialogMode.Edit

  vacationRecord.value.vacationId = e.vacationId
  vacationRecord.value.vacationName = e.vacationName
  vacationRecord.value.startDate = e.startDate
  vacationRecord.value.endDate = e.endDate
  vacationDates.value = [new Date(e.startDate), new Date(e.endDate)]

  isVacationDetailDialogVisible.value = true
}

const onDeleteVacationRowClick = async (e: number): Promise<void> => {
  await vacationStore.removeVacation(e)
  await vacationStore.getVacations()
}
</script>

<template>
  <div class="flex">
    <h1 class="text-2xl text-black font-light mb-6">Godišnji odmori</h1>
  </div>
  <div class="grid grid-cols-4">
    <div class="col-span-4 lg:col-span-2">
      <Panel>
        <template #header>
          <h1 class="font-semibold">Godišnji odmori</h1>
          <Badge
            v-if="vacations.isFinished"
            :value="vacations.data.length"
            class="ml-2"
          ></Badge>
          <Button
            class="!ml-auto"
            size="small"
            icon="pi pi-plus"
            label="Novi odmor"
            @click="onNewVacationClick"
          >
          </Button>
        </template>
        <div class="flex flex-col" v-if="vacations.isFinished">
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
            <Column>
              <template #body="slotProps">
                <Button
                  class="!bg-transparent !p-0 !h-[32px] !w-[32px] !text-gray-400 !border-none hover:!bg-gray-100 hover:!text-black focus:!shadow-none"
                  icon="pi pi-pencil"
                  rounded
                  @click="onEditVacationRowClick(slotProps.data)"
                ></Button>
                <Button
                  class="!bg-transparent !p-0 !h-[32px] !w-[32px] !text-gray-400 !border-none hover:!bg-gray-100 hover:!text-black focus:!shadow-none"
                  icon="pi pi-times"
                  rounded
                  @click="onDeleteVacationRowClick(slotProps.data.vacationId)"
                ></Button>
              </template>
            </Column>
          </DataTable>
          <InlineMessage
            v-if="vacations.data == 0"
            class="!m-5"
            severity="info"
          >
            Trenutno nema unetih godišnjih odmora.
          </InlineMessage>
          <Dialog
            v-model:visible="isVacationDetailDialogVisible"
            :header="computedVacationDetailDialogHeader"
            class="w-[100%] lg:w-auto"
            modal
          >
            <div class="flex flex-col gap-2">
              <label for="txtVacationName">Naziv odmora</label>
              <InputText id="txtVacationName" type="text" v-model="vacationRecord.vacationName" />
              <label>Dani</label>
              <Calendar
                inline
                v-model="vacationDates"
                selection-mode="range"
                :manual-input="false"
                :min-date="getTomorowDate()"
              >
              </Calendar>
            </div>
            <template #footer>
              <Button 
                icon="pi pi-save"
                label="Sačuvaj"
                class="!m-0"
                :loading="postVacation.isLoading"
                @click="onSaveVacationClick"
              ></Button>
            </template>
          </Dialog>
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
:deep(.p-panel-header) {
  @apply px-[1.25em] py-[0.75em]
}

:deep(.p-panel-content) {
  @apply p-0;
}

:deep(.headerless .p-datatable-thead) {
  @apply hidden;
}
</style>