<script setup lang="ts">
import { ref } from 'vue'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputSwitch from 'primevue/inputswitch'
import InputMask from 'primevue/inputmask'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useWorkingHoursStore } from '@/stores/working-hours.store';
import { useTimeOnlyToDefaultTimeFormatter } from '@/composables/useDateTimeFormatter';

const workingHoursStore = useWorkingHoursStore()
const { workingDays, putWorkingDays } = workingHoursStore

workingHoursStore.getWorkingDays()

const hideWorkingHourMessage = ref(localStorage.getItem("hideWorkingHourMessage") == "true" ? true : false)

const onHideInfoMessageClick = () => {
  localStorage.setItem("hideWorkingHourMessage", "true")
  hideWorkingHourMessage.value = true
}

const formatIsActiveLabel = (isActive: boolean) => {
  return isActive ? 'OTOVRENO' : 'ZATVORENO'
}

const getIsActiveSeverity = (isActive: boolean) => {
  return isActive ? 'success' : 'danger'
}

const editingRows = ref([]);

const onIsActiveChange = (value: any, data: any) => {
  if(!value) {
    data.startTime = null
    data.endTime = null
  }
}

const onRowEditSave = (event: any) => {
  let { newData, index } = event;

  newData.startTime = useTimeOnlyToDefaultTimeFormatter(newData.startTime, true)
  newData.endTime = useTimeOnlyToDefaultTimeFormatter(newData.endTime, true)

  workingDays.data[index] = newData;
}

const onSaveClick = async () => {
  await workingHoursStore.updateWorkingDays()
  await workingHoursStore.getWorkingDays()
}
</script>

<template>
  <h1 class="text-2xl text-black font-light mb-6">Radno vreme</h1>

  <div class="grid grid-cols-4">
    <div class="col-span-4 lg:col-span-3 xl:col-span-2">
      <Message v-show="!hideWorkingHourMessage" severity="info">
        Izmenjeno radno vreme ne utiče na rezervacije koje su odobrene ili koje čekaju odobrenje. <br>
        <span class="underline cursor-pointer" @click="onHideInfoMessageClick">Klikni ovde</span> kako se ova poruka više ne bi prikazivala.
      </Message>
      <Panel toggleable>
        <template #header>
          <h1 class="font-semibold">Izmeni radno vreme</h1>
        </template>
        <div class="flex flex-col" v-if="workingDays.isFinished">
          <DataTable
            v-if="workingDays.data.length > 0"
            :value="workingDays.data"
            v-model:editingRows="editingRows"
            @row-edit-save="onRowEditSave" 
            edit-mode="row"
            tableClass="p-datatable-sm headerless" 
            dataKey="workingDayId"
            striped-rows
          >
            <Column field="workingDayName" header="Dan"></Column>
            <Column field="isActive" header="Aktivan" bodyStyle="text-align:center">
              <template #body="slotProps">
                <Tag :value="formatIsActiveLabel(slotProps.data.isActive)" :severity="getIsActiveSeverity(slotProps.data.isActive)"></Tag>
              </template>
              <template #editor="{ data, field }">
                  <InputSwitch v-model="data[field]" @input="onIsActiveChange($event, data)"/>
              </template>
            </Column>
            <Column field="startTime">
              <template #body="slotProps">
                <div class="text-center">
                  {{ useTimeOnlyToDefaultTimeFormatter(slotProps.data.startTime) }}
                </div>
              </template>
              <template #editor="{ data, field }">
                <div class="flex justify-center">
                  <InputMask 
                    v-model="data[field]" 
                    mask="99:99"
                    class="w-[5rem]"
                    :disabled="!data.isActive"
                  >
                  </InputMask>
                </div>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <div class="text-center">
                  {{ slotProps.data.startTime != null && slotProps.data.endTime != null ? '-' : '' }}
                </div>
              </template>
            </Column>
            <Column field="endTime">
              <template #body="slotProps">
                <div class="text-center">
                  {{ useTimeOnlyToDefaultTimeFormatter(slotProps.data.endTime) }}
                </div>
              </template>
              <template #editor="{ data, field }">
                <div class="flex justify-center">
                  <InputMask
                    v-model="data[field]"
                    mask="99:99"
                    class="w-[5rem]"
                    :disabled="!data.isActive"
                  >
                  </InputMask>
                </div>
              </template>
            </Column>
            <Column 
              :rowEditor="true" 
              style="width: 10%; 
              min-width: 8rem" 
              bodyStyle="text-align:center"
            >
            </Column>
          </DataTable>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="workingDays.isLoading">
          <ProgressSpinner
            style="height: 50px; width: 50px"
            strokeWidth="4"
            animationDuration=".5s"
          />
        </div>
        <template #footer>
          <div class="flex justify-end">
            <Button 
              label="Sačuvaj"
              icon="pi pi-save"
              size="small"
              :loading="putWorkingDays.isLoading"
              @click="onSaveClick()"
            ></Button>
          </div>
        </template>
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

:deep(.p-paginator button) {
  @apply !min-w-[2.25rem] !h-[2.25rem];
}
</style>
