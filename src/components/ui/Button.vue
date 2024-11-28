<script setup lang="ts">
import type { ButtonType, Variant, Size, Rounded } from '@/types'
import { useProvider } from '@/components/ui/provider'

export interface IProps {
  /**
   * General Props
   */
  disabled?: boolean
  variant?: Variant
  outline?: boolean
  rounded?:  Rounded
  size?: Size
  label?: string

  /**
   * Specific Props
   */
  type?: ButtonType
  loading?: boolean
  text?: boolean
  link?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  disabled: false,
  loading: false,
  variant: 'primary',
  outline: false,
  rounded: 'md',
  text: false,
  link: false,
  size: 'md',
  label: 'Button',
})

const { setDisabled, setRounded, setSize } = useProvider()

const setVariant = computed<string>(() => {
  switch (props.variant) {
  case 'primary': {
    if (props.outline) return 'border border-primary text-primary hover:bg-primary hover:text-white'
    if (props.text) return 'text-primary hover:bg-primary/20'
    if (props.link) return 'text-primary hover:text-primary/70'
    return 'bg-primary text-white hover:bg-primary/80'
  }
  case 'secondary': {
    if (props.outline) return 'border border-secondary text-secondary hover:bg-secondary hover:text-white'
    if (props.text) return 'text-secondary hover:bg-secondary/20'
    if (props.link) return 'text-secondary hover:text-secondary/70'
    return 'bg-secondary text-white hover:bg-secondary/80'
  }
  case 'success': {
    if (props.outline) return 'border border-success text-success hover:bg-success hover:text-white'
    if (props.text) return 'text-success hover:bg-success/20'
    if (props.link) return 'text-success hover:text-success/70'
    return 'bg-success text-white hover:bg-success/80'
  }
  case 'danger': {
    if (props.outline) return 'border border-danger text-danger hover:bg-danger hover:text-white'
    if (props.text) return 'text-danger hover:bg-danger/20'
    if (props.link) return 'text-danger hover:text-danger/70'
    return 'bg-danger text-white hover:bg-danger/80'
  }
  case 'warning': {
    if (props.outline) return 'border border-warning text-warning hover:bg-warning hover:text-white'
    if (props.text) return 'text-warning hover:bg-warning/20'
    if (props.link) return 'text-warning hover:text-warning/70'
    return 'bg-warning text-white hover:bg-warning/80'
  }
  }
})
</script>


<template>
  <button
    v-bind="$attrs"
    class="px-4 py-2 transition-all ease-in-out duration-500 text-ellipsis text-pretty flex items-center justify-center gap-2"
    :class="[setVariant, setRounded({ rounded }), setDisabled({ disabled, loading }), setSize({ size })]"
    :disabled="disabled || loading"
    :type="type"
  >
    <span v-if="$slots.prefix || loading">
      <IconTablerLoader2
        v-if="loading"
        class="animate-spin"
      />
      <slot
        v-if="!loading"
        name="prefix"
      />
    </span>

    <span>
      <slot>{{ label }}</slot>
    </span>
    
    <span v-if="$slots.suffix">
      <slot name="suffix" />
    </span>
  </button>
</template>