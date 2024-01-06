<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import { useServiceTypeStore } from '@/stores/service-type.store'

const serviceTypeStore = useServiceTypeStore()
const { serviceTypes, putServiceType } = serviceTypeStore

serviceTypeStore.getServiceTypes()

const isEditServiceTypeModalVisible: Ref<boolean> = ref(false)
const editServiceTypeObject: Ref<any> = ref({})

const onEditServiceTypeRowClick = (serviceTypeId: number): void => {
  editServiceTypeObject.value = serviceTypes.data.find(
    (st: any) => st.serviceTypeId == serviceTypeId
  )

  isEditServiceTypeModalVisible.value = true
}

const onSaveServiceTypeClick = async () => {
  await serviceTypeStore.updateServiceType(editServiceTypeObject.value)

  isEditServiceTypeModalVisible.value = false

  serviceTypeStore.getServiceTypes()
}
</script>

<template>
  <h1 class="text-2xl text-black font-light mb-6">Usluge</h1>

  <div class="grid grid-cols-4">
    <div class="col-span-4 lg:col-span-3 xl:col-span-2">
      <Panel toggleable>
        <template #header>
          <h1 class="font-semibold">Izmeni usluge</h1>
        </template>
        <div class="flex flex-col" v-if="serviceTypes.isFinished">
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
                  icon="pi pi-pencil"
                  rounded
                  @click="onEditServiceTypeRowClick(slotProps.data.serviceTypeId)"
                ></Button>
              </template>
            </Column>
          </DataTable>
          <Dialog
            v-model:visible="isEditServiceTypeModalVisible"
            header="Izmeni uslugu"
            class="w-[100%] lg:w-auto"
            modal
          >
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2 lg:col-span-1 flex flex-col gap-2">
                <label for="username">Naziv usluge</label>
                <InputText type="text" v-model="editServiceTypeObject.serviceTypeName" />
                <label for="username">Cena</label>
                <div class="p-inputgroup">
                  <InputNumber type="text" v-model="editServiceTypeObject.serviceTypePrice" />
                  <span class="p-inputgroup-addon"><small>RSD</small></span>
                </div>
                <label for="username">Trajanje</label>
                <div class="p-inputgroup">
                  <InputNumber type="text" v-model="editServiceTypeObject.serviceTypeDuration" />
                  <span class="p-inputgroup-addon">min</span>
                </div>
              </div>
              <div class="col-span-2 lg:col-span-1 flex flex-col gap-2">
                <h1 class="font-semibold">Dostupnost po danima</h1>
                <div class="border border-[#d6d6d6] rounded p-3">
                  <table cellspasic="30" class="w-full">
                    <tr>
                      <td>Ponedeljak</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnMonday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Utorak</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnTuesday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Sreda</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnWednesday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Četvrtak</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnThursday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Petak</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnFriday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Subota</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnSaturday" />
                      </td>
                    </tr>
                    <tr>
                      <td>Nedelja</td>
                      <td class="text-right">
                        <InputSwitch v-model="editServiceTypeObject.isAvailableOnSunday" />
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
                :loading="putServiceType.isLoading"
                @click="onSaveServiceTypeClick"
              >
              </Button>
            </template>
          </Dialog>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="serviceTypes.isLoading">
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

:deep(.p-paginator button) {
  @apply !min-w-[2.25rem] !h-[2.25rem];
}
</style>
