<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Message from 'primevue/message'
import Button from 'primevue/button'
import { useDefaultDateFormatter, useDefaultTimeFormatter } from '@/composables/useDateTimeFormatter'
import { useAppointmentStore } from '@/stores/appointment.store'

onUnmounted(() => {
  appointmentStatus.data = null
})

const appointmentId = ref(null as unknown)
const phoneNumber = ref('' as string)
const errorMessage = ref('' as string)

const appointmentStore = useAppointmentStore()
const { appointmentStatus } = appointmentStore

const onAppointmentStatusCheckClick = async (): Promise<void> => {
  await appointmentStore.getAppointmentStatus((appointmentId.value as Number), phoneNumber.value)

  if (appointmentStatus.isAborted) {
    errorMessage.value = appointmentStatus.response?.data.description
  }
  else {
    errorMessage.value = ''
  }
}

const computedResponseDivClass = computed(() => {
  if (appointmentStatus.data) {
    switch (appointmentStatus.data.appointmentStatusName) {
      case 'Čeka potvrdu':
        return 'bg-gold-50 border-gold-500'
      case 'Prihvaćena':
      case 'Izvršena':
        return 'bg-green-50 border-green-500'
      case 'Odbijena':
      case 'Propuštena':
        return 'bg-red-50 border-red-700'
      case 'Istekla':
        return 'bg-gray-50 bg-gray-500'
    }
  }

  return 'bg-white'
})
</script>

<template>
<div class="min-h-screen flex items-center justify-center bg-zinc-50">
    <div class="flex flex-col p-6 w-full md:w-[430px] mt-[-50px]">
      <img src="@/assets/logo-light.png" class="h-[120px] self-center mb-6" />
      <h1 class="text-2xl text-center !text-black font-light mb-6">Proveri status rezervacije</h1>
      <div class="flex flex-col gap-2 border rounded bg-white p-6 mb-6">
        <label class="font-medium" for="email">Broj rezervacije</label>
        <InputText v-model="appointmentId" type="number" />

        <label class="font-medium" for="email">Broj telefona</label>
        <InputMask
          class="mb-6"
          v-model="phoneNumber"
          mask="0699999999"
          placeholder="0601234567"
        ></InputMask>

        <Message v-if="errorMessage.length > 0" severity="error" class="!mt-0 text-sm">{{
          errorMessage
        }}</Message>

        <div 
          v-if="appointmentStatus.data"
          :class="computedResponseDivClass"
          class="mb-6 p-3 border rounded-lg">
          <table class="text-left">
            <tr>
              <th>Status:</th>
              <td class="pl-3">{{ appointmentStatus.data.appointmentStatusName }}</td>
            </tr>
            <tr>
              <th>Datum:</th>
              <td class="pl-3">
                {{ useDefaultDateFormatter(appointmentStatus.data.appointmentDate) }}
              </td>
            </tr>
            <tr>
              <th>Vreme:</th>
              <td class="pl-3">
                {{ useDefaultTimeFormatter(appointmentStatus.data.appointmentDate) }}
              </td>
            </tr>
          </table>
        </div>

        <Button 
          class="text-center" 
          label="Proveri status"
          :disabled="Number(appointmentId) < 1 || phoneNumber.trim().length == 0"
          @click="onAppointmentStatusCheckClick"
        >
        </Button>
      </div>
      <div class="flex flex-col gap-2 border rounded bg-white p-6">
        <p class="text-sm text-medium text-justify">
          Za povratak na
          početnu stranicu
          <router-link to="/"><span class="text-gold-600">klikni ovde</span>.</router-link>
        </p>
      </div>
    </div>
  </div>
</template>