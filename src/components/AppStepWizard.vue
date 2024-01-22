<script setup lang="ts">
import { ref } from 'vue'
import { type Ref } from 'vue'
import AppSteps from './AppSteps.vue'
import Button from 'primevue/button'

interface AppStepWizardItem {
  stepTitle: string
}

const props = defineProps({
  items: {
    type: Array<AppStepWizardItem>,
    required: true,
    default: []
  },
  disableNextButton: {
    type: Boolean,
    required: false,
    default: false
  },
  onReserveClickHandler: {
    type: Function,
    required: true
  },
  isReservationLoading: {
    type: Boolean,
    required: true
  },
  isReservationFinished: {
    type: Boolean,
    required: true,
  },
  onNewReservationClickHandler: {
    type: Function,
    required: true
  }
})

const emits = defineEmits(['update:step-index'])

const currentStepIndex: Ref<number> = ref(0)

const isSlideTransitionBackwards = ref(false)

const onPreviousStepClick = () => {
  isSlideTransitionBackwards.value = true
  currentStepIndex.value--
  emits('update:step-index', currentStepIndex.value)
}

const onNextStepClick = () => {
  isSlideTransitionBackwards.value = false

  if (currentStepIndex.value + 1 < props.items.length) {
    currentStepIndex.value++
    emits('update:step-index', currentStepIndex.value)
  }
}

const onNewReservationClick = () => {
  currentStepIndex.value = 0
  props.onNewReservationClickHandler()
}
</script>

<template>
  <!-- Mobile version -->
  <div class="flex flex-col h-screen bg-zinc-50 border-y">
    <div class="px-10 pt-6 pb-3">
      <!-- App Steps -->
      <AppSteps :steps-count="items.length" :current-step-index="currentStepIndex"> </AppSteps>

      <h1 class="leading-[1] text-[2.35rem] lg:text-5xl mt-4">
        {{ items[currentStepIndex].stepTitle }}
      </h1>
    </div>
    <div class="flex-grow px-10 py-6 bg-zinc-50 overflow-y-auto overflow-x-hidden">
      <!-- Content -->
      <TransitionGroup
        tag="div"
        :name="isSlideTransitionBackwards ? 'back-slide' : 'slide'"
        class="relative"
        style="will-change: transform"
      >
        <div :key="currentStepIndex" class="w-full absolute">
          <slot :name="`step${currentStepIndex + 1}Content`"></slot>
        </div>
      </TransitionGroup>
    </div>
    <div class="px-10 py-3 pb-6">
      <!-- Actions -->
      <Button
        v-if="!isReservationLoading && !isReservationFinished"
        v-show="currentStepIndex != 0"
        label="Prethodni korak"
        icon="pi pi-chevron-left"
        outlined
        @click="onPreviousStepClick"
      >
      </Button>
      <Button
        v-if="currentStepIndex < items.length - 1"
        label="Sledeći korak"
        icon="pi pi-chevron-right"
        icon-pos="right"
        class="float-right"
        @click="onNextStepClick"
        :disabled="disableNextButton"
      >
      </Button>
      <Button
        v-if="currentStepIndex == items.length - 1 && !isReservationFinished"
        label="Rezerviši"
        icon="pi pi-check"
        class="float-right"
        @click="onReserveClickHandler"
        :loading="isReservationLoading"
      >
      </Button>
      <Button
        v-if="isReservationFinished"
        label="Nova rezervacija"
        icon="pi pi-plus"
        class="float-right"
        @click="onNewReservationClick"
      >
      </Button>
    </div>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter-from {
  transform: translateX(calc(100% + 2.5rem));
}

.slide-leave-to {
  transform: translateX(calc(-100% - 2.5rem));
}

.back-slide-enter-active,
.back-slide-leave-active {
  transition: transform 0.5s;
}

.back-slide-enter-from {
  transform: translateX(calc(-100% - 2.5rem));
}

.back-slide-leave-to {
  transform: translateX(calc(100% + 2.5rem));
}
</style>
