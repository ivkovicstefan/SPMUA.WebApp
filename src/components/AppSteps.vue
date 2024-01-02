<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  stepsCount: {
    type: Number,
    required: true,
    default: 1
  },
  currentStepIndex: {
    type: Number,
    required: true,
    default: 0
  }
})

const getBackgroundClass = (stepIndex: Number) => {
  if (props.currentStepIndex >= stepIndex) {
    return 'bg-black'
  } else {
    return 'bg-white'
  }
}
</script>

<template>
  <div class="flex gap-2">
    <div
      v-for="(step, index) in stepsCount"
      class="flex-grow p-1 border border-black rounded-lg"
      :class="getBackgroundClass(index)"
    ></div>
  </div>
</template>
