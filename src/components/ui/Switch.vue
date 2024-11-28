<script setup lang="ts">
import type { Variant, Size, Placement } from '@/types'

export interface IProps {
  /**
   * General Props
   */
  modelValue?: boolean
  disabled?: boolean
  variant?: Variant
  size?: Size
  label?: string
  required?: boolean

  /**
   * Switch Props
   */
  labelPlacement?: Extract<Placement, 'top' | 'left'>
}

interface IEmits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<IProps>(), {
  labelPlacement: 'top'
})
const emit = defineEmits<IEmits>()

const modelVal = useVModel(props, 'modelValue', emit)

const setLabelPlacement = computed(() => props.labelPlacement === 'left' ? 'flex-row' : 'flex-col')
const setVariant = computed(() => `var(--${props.variant})`)
</script>

<template>
  <div
    class="flex gap-2"
    :class="[setLabelPlacement]"
  >
    <span
      v-if="label"
      class="text-xs text-gray-500 flex items-center gap-1"
    >
      {{ label }}

      <span
        v-if="required"
        class="text-danger"
      >
        *
      </span>
    </span>

    <label class="switch">
      <input
        v-model="modelVal"
        type="checkbox"
      >
      <span class="slider round" />
    </label>
  </div>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: v-bind(setVariant);
}

input:focus + .slider {
  box-shadow: 0 0 1px v-bind(setVariant);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>