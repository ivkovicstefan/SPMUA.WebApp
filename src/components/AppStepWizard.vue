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
  }
})

const currentStepIndex: Ref<number> = ref(0)

const isSlideTransitionBackwards = ref(false)

const onPreviousStepClick = () => {
  isSlideTransitionBackwards.value = true
  currentStepIndex.value--
}

const onNextStepClick = () => {
  isSlideTransitionBackwards.value = false

  if (currentStepIndex.value + 1 < props.items.length) {
    currentStepIndex.value++
  }
}
</script>

<template>
  <!-- Mobile version -->
  <div class="flex flex-col h-screen">
    <div class="px-10 py-6 border-b">
      <!-- App Steps -->
      <AppSteps :steps-count="items.length" :current-step-index="currentStepIndex"> </AppSteps>

      <h1 class="text-4xl font-light mt-4">
        {{ items[currentStepIndex].stepTitle }}
      </h1>
    </div>
    <div class="flex-grow px-10 py-6 bg-zinc-50 overflow-y-auto">
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
    <div class="px-10 py-3 border-t">
      <!-- Actions -->
      <Button
        v-show="currentStepIndex != 0"
        label="Prethodni korak"
        icon="pi pi-chevron-left"
        outlined
        @click="onPreviousStepClick"
      >
      </Button>
      <Button
        :label="currentStepIndex == items.length - 1 ? 'Rezerviši' : 'Sledeći korak'"
        :icon="currentStepIndex == items.length - 1 ? 'pi pi-check' : 'pi pi-chevron-right'"
        :icon-pos="currentStepIndex == items.length - 1 ? 'left' : 'right'"
        class="float-right"
        @click="onNextStepClick"
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
