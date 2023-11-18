<script setup lang="ts">
import { ref, type PropType, computed } from 'vue'

interface RadioGroupOptions {
    valueProperty: string;
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
});

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
    <template v-for="item in items">
        <div 
            class="bg-white mb-3 rounded shadow-lg"
            :class="{'!bg-black text-white': isActiveRadioItem(item)}"
            @click="onRadioItemClick(item)"
        >
            <slot name="radioItem" :item="item"></slot>
        </div>
    </template>
</template>

<style>
</style>
