<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InlineMessage from 'primevue/inlinemessage'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import { ReservationResponse } from '@/types/entities/ReservationResponse'
import { AppointmentStatusChangeAction } from '@/types/Enums'
import { useAppointmentStore } from '@/stores/appointment.store'
import {
  useDefaultDateFormatter,
  useDefaultTimeFormatter,
  useDateTimeAgoFormatter
} from '@/composables/useDateTimeFormatter'

const appointmentStore = useAppointmentStore()
const { appointments, patchAppointmentStatus } = appointmentStore

const pendingAppointmentsExpandedRows = ref([])
const confirmedAppointmentsExpandedRows = ref([])
const rejectedAppointmentsExpandedRows = ref([])

const computedPendingAppointments = computed(() => {
  return appointments.data.filter((a) => a.appointmentStatusId == 1)
})

const computedConfirmedAppointments = computed(() => {
  return appointments.data.filter((a) => a.appointmentStatusId == 2)
})

const rejectedConfirmedAppointments = computed(() => {
  return appointments.data.filter((a) => a.appointmentStatusId == 3)
})

appointmentStore.getAppointments()

const reservationResponseObject = reactive(new ReservationResponse())

const isConfirmOrRejectAppointmentModalVisible = ref(false)
const confirmOrRejectAppointmentModalMode = ref(0)
const confirmOrRejectAppointmentModalHeader = computed(() => {
  switch (confirmOrRejectAppointmentModalMode.value) {
    case AppointmentStatusChangeAction.Reject:
      return 'Odbij rezervaciju'
    case AppointmentStatusChangeAction.Approve:
      return 'Odobri rezervaciju'
    default:
      return 'Odobri rezervaciju'
  }
})
const confirmOrRejectAppointmentId = ref(0)

const onRejectAppointmentClick = (appointmentId: number): void => {
  confirmOrRejectAppointmentModalMode.value = AppointmentStatusChangeAction.Reject
  confirmOrRejectAppointmentId.value = appointmentId
  isConfirmOrRejectAppointmentModalVisible.value = true
}

const onApproveAppointmentClick = (appointmentId: number): void => {
  confirmOrRejectAppointmentModalMode.value = AppointmentStatusChangeAction.Approve
  confirmOrRejectAppointmentId.value = appointmentId
  isConfirmOrRejectAppointmentModalVisible.value = true
}

const onReservationResponseConfirm = async (): Promise<void> => {
  reservationResponseObject.appointmentId = confirmOrRejectAppointmentId.value
  reservationResponseObject.isAppointmentConfirmed =
    confirmOrRejectAppointmentModalMode.value == AppointmentStatusChangeAction.Approve

  await appointmentStore.updateAppointmentStatus(reservationResponseObject)
  isConfirmOrRejectAppointmentModalVisible.value = false
  appointmentStore.getAppointments()
  reservationResponseObject.clear()
}
</script>

<template>
  <h1 class="text-2xl text-black font-light mb-6">Rezervacije</h1>

  <div class="grid grid-cols-4 gap-6">
    <div class="col-span-4 lg:col-span-3">
      <Panel>
        <template #header>
          <div class="flex">
            <h1 class="font-semibold">Zahtevi za rezervaciju</h1>
            <Badge
              v-if="appointments.isFinished"
              :value="computedPendingAppointments.length"
              class="ml-1 !bg-gold-100 !text-gold-600"
            ></Badge>
          </div>
        </template>
        <div class="flex flex-col" v-if="appointments.isFinished">
          <DataTable
            v-if="computedPendingAppointments.length > 0"
            :value="computedPendingAppointments"
            class="p-datatable-sm headerless"
            v-model:expanded-rows="pendingAppointmentsExpandedRows"
            dataKey="appointmentId"
            striped-rows
            paginator
            :rows="5"
          >
            <Column expander />
            <template #expansion="slotProps">
              <div class="p-3">
                <table>
                  <tr>
                    <th>Broj rezervacije:</th>
                    <td class="pl-3">{{ slotProps.data.appointmentId }}</td>
                  </tr>
                  <tr>
                    <th>Datum:</th>
                    <td class="pl-3">
                      {{ useDefaultDateFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Vreme:</th>
                    <td class="pl-3">
                      {{ useDefaultTimeFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Email adresa:</th>
                    <td class="pl-3">{{ slotProps.data.customerEmail }}</td>
                  </tr>
                  <tr>
                    <th>Broj telefona:</th>
                    <td class="pl-3">
                      <a :href="'tel:' + slotProps.data.customerPhone">{{
                        slotProps.data.customerPhone
                      }}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <Column>
              <template #body="slotProps">
                {{ slotProps.data.customerFirstName + ' ' + slotProps.data.customerLastName }}
              </template>
            </Column>
            <Column field="serviceTypeName" header="Usluga"></Column>
            <Column>
              <template #body="slotProps">
                <div class="flex items-center">
                  <i class="pi pi-clock mr-2" style="font-size: 0.75rem"></i>
                  {{ useDateTimeAgoFormatter(slotProps.data.createdDate) }}
                </div>
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button
                  size="small"
                  severity="danger"
                  icon="pi pi-times"
                  class="!p-1 mr-2"
                  outlined
                  @click="onRejectAppointmentClick(slotProps.data.appointmentId)"
                >
                </Button>
                <Button
                  size="small"
                  severity="success"
                  icon="pi pi-check"
                  class="!p-1"
                  outlined
                  @click="onApproveAppointmentClick(slotProps.data.appointmentId)"
                >
                </Button>
              </template>
            </Column>
          </DataTable>
          <Dialog
            v-model:visible="isConfirmOrRejectAppointmentModalVisible"
            modal
            :header="confirmOrRejectAppointmentModalHeader"
          >
            <div class="flex flex-col">
              <label for="txtComment" class="font-medium mb-2">Komentar</label>
              <Textarea
                v-model.value="reservationResponseObject.responseComment"
                id="txtComment"
                rows="5"
                cols="30"
                v-tooltip="
                  'Komentar će biti poslat klijentu u okviru automatskog email-a nakon odobravanja ili odbijanja rezervacije.'
                "
              ></Textarea>
            </div>
            <template #footer>
              <Button
                v-if="confirmOrRejectAppointmentModalMode == AppointmentStatusChangeAction.Reject"
                severity="danger"
                class="!w-full"
                label="Potvrdi"
                @click="onReservationResponseConfirm"
                :loading="patchAppointmentStatus.isLoading"
              >
              </Button>
              <Button
                v-if="confirmOrRejectAppointmentModalMode == AppointmentStatusChangeAction.Approve"
                severity="success"
                class="!w-full"
                label="Potvrdi"
                @click="onReservationResponseConfirm"
                :loading="patchAppointmentStatus.isLoading"
              >
              </Button>
            </template>
          </Dialog>
          <InlineMessage
            v-if="computedPendingAppointments.length == 0"
            class="!m-6"
            severity="info"
          >
            Trenutno nema rezervacija na čekanju.
          </InlineMessage>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="appointments.isLoading">
          <ProgressSpinner
            style="height: 50px; width: 50px"
            strokeWidth="4"
            animationDuration=".5s"
          />
        </div>
      </Panel>
    </div>
    <div class="col-span-4 lg:col-span-2">
      <Panel>
        <template #header>
          <div class="flex">
            <h1 class="font-semibold">Potvrđene rezervacije</h1>
            <Badge
              v-if="appointments.isFinished"
              :value="computedConfirmedAppointments.length"
              class="ml-1 !bg-green-100 !text-green-600"
            ></Badge>
          </div>
        </template>
        <div class="flex flex-col" v-if="appointments.isFinished">
          <DataTable
            v-if="computedConfirmedAppointments.length > 0"
            :value="computedConfirmedAppointments"
            class="p-datatable-sm headerless"
            v-model:expanded-rows="confirmedAppointmentsExpandedRows"
            dataKey="appointmentId"
            striped-rows
            paginator
            :rows="5"
          >
            <Column expander />
            <template #expansion="slotProps">
              <div class="p-3">
                <table>
                  <tr>
                    <th>Broj rezervacije:</th>
                    <td class="pl-3">{{ slotProps.data.appointmentId }}</td>
                  </tr>
                  <tr>
                    <th>Datum:</th>
                    <td class="pl-3">
                      {{ useDefaultDateFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Vreme:</th>
                    <td class="pl-3">
                      {{ useDefaultTimeFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Email adresa:</th>
                    <td class="pl-3">{{ slotProps.data.customerEmail }}</td>
                  </tr>
                  <tr>
                    <th>Broj telefona:</th>
                    <td class="pl-3">
                      <a :href="'tel:' + slotProps.data.customerPhone">{{
                        slotProps.data.customerPhone
                      }}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <Column>
              <template #body="slotProps">
                {{ slotProps.data.customerFirstName + ' ' + slotProps.data.customerLastName }}
              </template>
            </Column>
            <Column field="serviceTypeName" header="Usluga"></Column>
          </DataTable>
          <InlineMessage
            v-if="computedConfirmedAppointments.length == 0"
            class="!m-6"
            severity="info"
          >
            Trenutno nema rezervacija na čekanju.
          </InlineMessage>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="appointments.isLoading">
          <ProgressSpinner
            style="height: 50px; width: 50px"
            strokeWidth="4"
            animationDuration=".5s"
          />
        </div>
      </Panel>
    </div>
    <div class="col-span-4 lg:col-span-2">
      <Panel>
        <template #header>
          <div class="flex">
            <h1 class="font-semibold">Odbijene rezervacije</h1>
            <Badge
              v-if="appointments.isFinished"
              :value="rejectedConfirmedAppointments.length"
              class="ml-1 !bg-red-100 !text-red-600"
            ></Badge>
          </div>
        </template>
        <div class="flex flex-col" v-if="appointments.isFinished">
          <DataTable
            v-if="rejectedConfirmedAppointments.length > 0"
            :value="rejectedConfirmedAppointments"
            class="p-datatable-sm headerless"
            v-model:expanded-rows="rejectedAppointmentsExpandedRows"
            dataKey="appointmentId"
            striped-rows
            paginator
            :rows="5"
          >
            <Column expander />
            <template #expansion="slotProps">
              <div class="p-3">
                <table>
                  <tr>
                    <th>Broj rezervacije:</th>
                    <td class="pl-3">{{ slotProps.data.appointmentId }}</td>
                  </tr>
                  <tr>
                    <th>Datum:</th>
                    <td class="pl-3">
                      {{ useDefaultDateFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Vreme:</th>
                    <td class="pl-3">
                      {{ useDefaultTimeFormatter(slotProps.data.appointmentDate) }}
                    </td>
                  </tr>
                  <tr>
                    <th>Email adresa:</th>
                    <td class="pl-3">{{ slotProps.data.customerEmail }}</td>
                  </tr>
                  <tr>
                    <th>Broj telefona:</th>
                    <td class="pl-3">
                      <a :href="'tel:' + slotProps.data.customerPhone">{{
                        slotProps.data.customerPhone
                      }}</a>
                    </td>
                  </tr>
                </table>
              </div>
            </template>
            <Column>
              <template #body="slotProps">
                {{ slotProps.data.customerFirstName + ' ' + slotProps.data.customerLastName }}
              </template>
            </Column>
            <Column field="serviceTypeName" header="Usluga"></Column>
          </DataTable>
          <InlineMessage
            v-if="rejectedConfirmedAppointments.length == 0"
            class="!m-6"
            severity="info"
          >
            Trenutno nema odbijenih rezervacija.
          </InlineMessage>
        </div>
        <div class="flex items-center min-h-[300px]" v-if="appointments.isLoading">
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
