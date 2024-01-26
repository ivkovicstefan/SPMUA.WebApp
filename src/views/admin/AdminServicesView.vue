<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'
import Panel from 'primevue/panel'
import Badge from 'primevue/badge'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import Menu from 'primevue/menu'
import { useServiceTypeStore } from '@/stores/service-type.store'
import { ServiceType } from '@/types/entities/ServiceType'
import { DialogMode } from '@/types/Enums'
import { required, maxLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const serviceTypeStore = useServiceTypeStore()
const { serviceTypes, postServiceType, putServiceType, deleteServiceType } = serviceTypeStore

serviceTypeStore.getServiceTypes()

const serviceTypeRecord: Ref<any> = ref(new ServiceType())
const serviceTypeValidationSchema = {
  serviceTypeName: {
    maxLength: helpers.withMessage(({
      $pending,
      $invalid,
      $params,
      $model
    }) => `Maksimalna dužina je ${$params.max} karaktera.`, maxLength(50)),
    required: helpers.withMessage('Polje je obavezno.', required)
  },
  serviceTypePrice: {
    required: helpers.withMessage('Polje je obavezno.', required)
  },
  serviceTypeDuration: {
    required: helpers.withMessage('Polje je obavezno.', required)
  }
}

const v$ = useVuelidate(serviceTypeValidationSchema, serviceTypeRecord)

const isServiceTypeDetailDialogVisible: Ref<boolean> = ref(false)
const serviceTypeDialogMode = ref(0)

const computedServiceTypeDetailDialogHeader = computed(() => {
  switch (serviceTypeDialogMode.value) {
    case DialogMode.Add:
      return 'Nova usluga'
    case DialogMode.Edit:
      return 'Izmeni uslugu'
    default: 
      return ''
  }
})

const onNewServiceTypeClick = () => {
  serviceTypeRecord.value = new ServiceType()
  serviceTypeDialogMode.value = DialogMode.Add
  isServiceTypeDetailDialogVisible.value = true
}

const tableItemsMenu = ref();
const tableItemsMenuItems = ref([
  {
      label: 'Izmeni',
      icon: 'pi pi-pencil',
      command: () => {
        onEditServiceTypeRowClick()
      }
  },
  {
      label: 'Obriši',
      icon: 'pi pi-times',
      command: () => {
        onDeleteServiceTypeRowClick(serviceTypeRecord.value.serviceTypeId)
      }
  }
]);

const onRowMenuClick = (e: any, selectedServiceType: ServiceType) => {
  serviceTypeRecord.value = selectedServiceType
  tableItemsMenu.value.toggle(e);
};

const onEditServiceTypeRowClick = (): void => {
  serviceTypeDialogMode.value = DialogMode.Edit
  isServiceTypeDetailDialogVisible.value = true
}

const onSaveServiceTypeClick = async (): Promise<void> => {
  await v$.value.$validate()
  v$.value.$touch()
  console.log(v$.value)
  if (!v$.value.$invalid) {
    if (serviceTypeDialogMode.value == DialogMode.Add) {
      await serviceTypeStore.createServiceType(serviceTypeRecord.value)
      serviceTypeStore.getServiceTypes()
    }
    else if (serviceTypeDialogMode.value == DialogMode.Edit) {
      await serviceTypeStore.updateServiceType(serviceTypeRecord.value)
      serviceTypeStore.getServiceTypes()

    }

    isServiceTypeDetailDialogVisible.value = false
  }
}

const onDeleteServiceTypeRowClick = async(serviceTypeId: number): Promise<void> => {
  await serviceTypeStore.removeServiceType(serviceTypeId)
  await serviceTypeStore.getServiceTypes()
}
</script>

<template>
  <h1 class="text-2xl text-black font-light mb-6">Usluge</h1>

  <div class="grid grid-cols-4">
    <div class="col-span-4 lg:col-span-3 xl:col-span-2">
      <Panel>
        <template #header>
          <h1 class="font-semibold">Usluge</h1>
          <Badge
            v-if="serviceTypes.isFinished"
            :value="serviceTypes.data.length"
            class="ml-2"
          ></Badge>
          <Button
            class="!ml-auto"
            size="small"
            icon="pi pi-plus"
            label="Nova usluga"
            @click="onNewServiceTypeClick"
          >
          </Button>
        </template>
        <div class="flex flex-col" v-if="serviceTypes.isFinished && !deleteServiceType.isLoading">
          <DataTable
            v-if="serviceTypes.data.length > 0"
            :value="serviceTypes.data"
            class="headerless"
            dataKey="serviceTypeId"
            striped-rows
          >
            <Column field="serviceTypeName"></Column>
            <Column field="serviceTypePrice">
              <template #body="slotProps">
                {{ slotProps.data.serviceTypePrice.toFixed(2) }} <small>RSD</small>
              </template>
            </Column>
            <Column field="serviceTypeDuration">
              <template #body="slotProps">
                <i class="pi pi-clock !text-[0.9rem] !text-gray-400 mr-1"></i
                >{{ slotProps.data.serviceTypeDuration + ' min' }}
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button
                  class="!bg-transparent !p-0 !h-[32px] !w-[32px] !text-gray-400 !border-none hover:!bg-gray-100 hover:!text-black focus:!shadow-none"
                  icon="pi pi-ellipsis-v"
                  rounded
                  @click="onRowMenuClick($event, slotProps.data)"
                ></Button>
                <Menu
                  id="overlay_menu"
                  ref="tableItemsMenu"
                  :model="tableItemsMenuItems"
                  popup  
                >
                </Menu>
              </template>
            </Column>
          </DataTable>
          <Dialog
            v-model:visible="isServiceTypeDetailDialogVisible"
            :header="computedServiceTypeDetailDialogHeader"
            class="w-[100%] lg:w-auto"
            modal
          >
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2 lg:col-span-1 flex flex-col gap-2">
                <label for="username">
                  Naziv usluge
                </label>
                <InputText 
                  type="text" 
                  :class="{'!border-red-600': v$.serviceTypeName.$errors.length > 0}"
                  v-model="serviceTypeRecord.serviceTypeName" 
                />
                <span 
                  v-if="v$.serviceTypeName.$errors.length > 0"
                  class="text-red-600 text-sm"  
                >
                  {{ v$.serviceTypeName.$errors[0].$message }}
                </span>
                <label for="username">Cena</label>
                <div class="p-inputgroup">
                  <InputNumber 
                    type="text" 
                    v-model="serviceTypeRecord.serviceTypePrice"
                    :class="{'!border-red-600': v$.serviceTypePrice.$errors.length > 0}"
                  />
                  <span class="p-inputgroup-addon"><small>RSD</small></span>
                </div>
                <span 
                  v-if="v$.serviceTypePrice.$errors.length > 0"
                  class="text-red-600 text-sm"  
                >
                  {{ v$.serviceTypePrice.$errors[0].$message }}
                </span>
                <label for="username">Trajanje</label>
                <div class="p-inputgroup">
                  <InputNumber 
                    type="text" 
                    v-model="serviceTypeRecord.serviceTypeDuration" 
                    :class="{'!border-red-600': v$.serviceTypeDuration.$errors.length > 0}"
                  />
                  <span class="p-inputgroup-addon">min</span>
                </div>
                <span 
                  v-if="v$.serviceTypeDuration.$errors.length > 0"
                  class="text-red-600 text-sm"  
                >
                  {{ v$.serviceTypeDuration.$errors[0].$message }}
                </span>
              </div>
              <div class="col-span-2 lg:col-span-1 flex flex-col gap-2">
                <h1 class="font-semibold">Dostupnost po danima</h1>
                <div class="border border-[#d6d6d6] rounded p-3">
                  <table cellspasic="30" class="w-full">
                    <tr>
                      <td>Ponedeljak</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnMonday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Utorak</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnTuesday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Sreda</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnWednesday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Četvrtak</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnThursday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Petak</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnFriday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Subota</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnSaturday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Nedelja</td>
                      <td class="text-right">
                        <InputSwitch v-model="serviceTypeRecord.isAvailableOnSunday" />
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <template #footer>
              <Button
                icon="pi pi-save"
                label="Sačuvaj"
                class="!m-0"
                :loading="postServiceType.isLoading || putServiceType.isLoading"
                @click="onSaveServiceTypeClick"
              >
              </Button>
            </template>
          </Dialog>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="serviceTypes.isLoading || deleteServiceType.isLoading">
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

:deep(.p-paginator button) {
  @apply !min-w-[2.25rem] !h-[2.25rem];
}
</style>
