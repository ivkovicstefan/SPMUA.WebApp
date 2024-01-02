<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'

interface RadioGroupOptions {
  valueProperty: string
  itemDirection: string
}

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  },
  items: {
    type: Array as any,
    required: true
  },
  options: {
    type: Object as PropType<RadioGroupOptions>,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

const computedClassList = computed(() => {
  if (props.options.itemDirection == 'row') {
    return 'flex-row flex-wrap'
  } else if (props.options.itemDirection == 'column') {
    return 'flex-col'
  }
})

const isActiveRadioItem = (item: any) => {
  return item[props.options.valueProperty] == selectedValue.value
}

const onRadioItemClick = (item: any) => {
  selectedValue.value = item[props.options.valueProperty]
  emits('update:modelValue', selectedValue.value)
}
</script>

<template>
  <div class="flex justify-start gap-3 items-left" :class="computedClassList">
    <template v-for="item in items">
      <div
        class="bg-white border rounded-lg shadow-lg"
        :class="{ '!bg-black text-white': isActiveRadioItem(item) }"
        @click="onRadioItemClick(item)"
      >
        <slot name="radioItem" :item="item"></slot>
      </div>
    </template>
  </div>
</template>

<style></style>
