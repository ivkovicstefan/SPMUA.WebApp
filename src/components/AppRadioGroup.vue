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
  } else {
    return ''
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
    <template v-for="(item, index) in items" :key="index">
      <div
        class="bg-white border-t-2 rounded-lg shadow-lg cursor-pointer hover:border-black transition hover:scale-105"
        :class="{ '!bg-black text-white border-black hover:!scale-100': isActiveRadioItem(item) }"
        @click="onRadioItemClick(item)"
      >
        <slot name="radioItem" :item="item"></slot>
      </div>
    </template>
  </div>
</template>

<style></style>
