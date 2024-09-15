<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'

interface RadioGroupOptions {
  valueProperty: string
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
  containerClass: {
    type: String,
    required: false
  },
  itemClass: {
    type: String,
    required: false
  },
  options: {
    type: Object as PropType<RadioGroupOptions>,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

const isActiveRadioItem = (item: any) => {
  return item[props.options.valueProperty] == selectedValue.value
}

const onRadioItemClick = (item: any) => {
  selectedValue.value = item[props.options.valueProperty]
  emits('update:modelValue', selectedValue.value)
}
</script>

<template>
  <div class="grid grid-cols-1 gap-6" :class="containerClass">
    <template v-for="(item, index) in items" :key="index">
      <div
        class="bg-white border-t-2 rounded-lg shadow-lg cursor-pointer hover:border-black transition hover:scale-105"
        :class="{ '!bg-black text-white border-black hover:!scale-100': isActiveRadioItem(item), itemClass }"
        @click="onRadioItemClick(item)"
      >
        <slot name="radioItem" :item="item"></slot>
      </div>
    </template>
  </div>
</template>

<style></style>
