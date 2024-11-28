<script setup lang="ts">
import type { Variant, Size, Rounded, InputType } from '@/types'
import { useProvider } from '@/components/ui/provider'
import type { Component } from 'vue'

export interface IProps {
  /**
   * General Props
   */
  modelValue?: string
  disabled?: boolean
  variant?: Variant
  outline?: boolean
  rounded?:  Rounded
  size?: Size
  label?: string
  placeholder?: string
  required?: boolean

  /**
   * Input Props
   */
  type?: InputType
  topLabel?: boolean
  prefixAction?: () => void
  suffixAction?: () => void
  prefixIcon?: Component
  suffixIcon?: Component
}

interface IEmits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  variant: 'primary',
  rounded: 'md',
  outline: false,
  disabled: false,
  size: 'md',
  topLabel: false
})

const emit = defineEmits<IEmits>()
const slots = useSlots()

const { setDisabled, setRounded, setSize, setTextColor } = useProvider()
const labelRef = ref<HTMLSpanElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(inputRef)
const modelVal = useVModel(props, 'modelValue', emit)

watch(
  focused,
  (focused) => {
    if (props.placeholder) return
    if (props.topLabel) return
    if (slots.prefix) return
    if (props.type === 'textarea') return

    if (focused) {
      labelRef.value?.classList.remove('text-gray-500')
      labelRef.value?.classList.add(`input-box__label__${props.outline ? 'focus-bg-white' : 'focus'}`)
      labelRef.value?.classList.add(setTextColor({ variant: props.variant }))
    }
    else if (inputRef.value?.value) {
      labelRef.value?.classList.remove('text-gray-500')
      labelRef.value?.classList.add(`input-box__label__${props.outline ? 'focus-bg-white' : 'focus'}`)
      labelRef.value?.classList.add(setTextColor({ variant: props.variant }))
    }
    else {
      labelRef.value?.classList.add('text-gray-500')
      labelRef.value?.classList.remove(setTextColor({ variant: props.variant }))
      labelRef.value?.classList.remove('input-box__label__focus')
      labelRef.value?.classList.remove('input-box__label__focus-bg-white')
    }
  }
)

const setVariant = computed<string>(() => {
  switch (props.variant) {
  case 'primary': {
    if (props.outline) return 'border focus:border-primary'
    return 'animate-focus rounded-bl-none rounded-br-none focus:border-b focus:border-primary'
  }
  case 'secondary': {
    if (props.outline) return 'border focus:border-secondary'
    return 'animate-focus rounded-bl-none rounded-br-none focus:border-b focus:border-secondary'
  }
  case 'warning': {
    if (props.outline) return 'border focus:border-warning'
    return 'animate-focus rounded-bl-none rounded-br-none focus:border-b focus:border-warning'
  }
  case 'success': {
    if (props.outline) return 'border focus:border-success'
    return 'animate-focus rounded-bl-none rounded-br-none focus:border-b focus:border-success'
  }
  case 'danger': {
    if (props.outline) return 'border focus:border-danger'
    return 'animate-focus rounded-bl-none rounded-br-none focus:border-b focus:border-danger'
  }
  }
})

const setPersistentLabel = computed(() => props.placeholder && (props.outline ? 'input-box__label__focus-bg-white' : 'input-box__label__focus'))
const setTopLabel = computed(() => props.topLabel && (props.outline ? 'input-box__label__top-label' : 'input-box__label__focus'))
const setPrefix = computed(() => (slots.prefix && props.outline) && 'rounded-l-none')
const setSuffix = computed(() => (slots.suffix && props.outline) && 'rounded-r-none')
const setPrefixIcon = computed(() => props.prefixIcon && 'pl-8')
const setSuffixIcon = computed(() => props.prefixIcon && 'pr-8')
const setIconColor = computed(() => focused.value ? setTextColor({ variant: props.variant }) : 'text-gray-500')
const setLabelTextarea = computed(() => props.type === 'textarea' && `top-0 ${focused.value && setTextColor({ variant: props.variant })}`)

onMounted(() => {
  inputRef.value?.addEventListener('input', function () {
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px';
  })
})
</script>

<template>
  <div class="flex flex-col gap-2 input-box">
    <span
      v-if="label && (!$slots.prefix || topLabel)"
      ref="labelRef"
      class="text-xs input-box__label text-gray-500"
      :class="[setPersistentLabel, setTopLabel, setPrefixIcon, setSuffixIcon, setLabelTextarea]"
    >
      {{ label }}

      <span
        v-if="required"
        class="text-danger"
      >
        *
      </span>
    </span>
  
    <div class="flex relative items-stretch w-fit">
      <div
        v-if="$slots.prefix && type !== 'textarea'"
        class="bg-gray-200 min-h-fit flex items-center px-3"
        :class="[setRounded({ rounded, left: true }), { 'cursor-pointer': prefixAction }]"
        @click="prefixAction"
      >
        <slot name="prefix" />
      </div>

      <div
        v-if="prefixIcon && type !== 'textarea'"
        class="absolute left-2 self-center"
        :class="[setIconColor]"
      >
        <Component :is="prefixIcon" />
      </div>

      <template v-if="type !== 'textarea'">
        <input
          ref="inputRef"
          v-model="modelVal"
          v-bind="$attrs"
          class="p-2 transition duration-500 ease-in-out min-w-[300px] input-box__input"
          :class="[
            setVariant,
            setDisabled({ disabled }), 
            setRounded({ rounded }), 
            setSize({ size }), 
            setPrefix,
            setSuffix,
            { 'pl-9': prefixIcon },
            { 'pr-9': suffixIcon },
          ]"
          :type="type"
          :placeholder="placeholder"
        >
      </template>

      <template v-else>
        <textarea
          ref="inputRef"
          v-model="modelVal"
          v-bind="$attrs"
          class="px-2 transition duration-500 ease-in-out min-w-[300px] input-box__input"
          :class="[
            setVariant,
            setDisabled({ disabled }),
            setRounded({ rounded }),
            setSize({ size }),
            { 'py-4': !placeholder },
          ]"
          :placeholder="placeholder"
        />
      </template>

      <div
        v-if="suffixIcon && type !== 'textarea'"
        class="absolute right-2 self-center"
        :class="[setIconColor]"
      >
        <Component :is="suffixIcon" />
      </div>

      <div
        v-if="$slots.suffix && type !== 'textarea'"
        class="bg-gray-200 min-h-fit flex items-center px-3"
        :class="[setRounded({ rounded, right: true }), { 'cursor-pointer': suffixAction }]"
        @click="suffixAction"
      >
        <slot name="suffix" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-box {
  position: relative;
  display: flex;
  justify-content: center;

  &__label {
    position: absolute;
    left: 8px;
    transition: all 0.3s ease-in-out;

    &__top-label {
      position: relative;
      font-size: 12px;
      left: 0;
    }

    &__focus {
      transform: translateY(-1.3rem);
      font-size: 10px;
      z-index: 1;
    }

    &__focus-bg-white {
      transform: translateY(-1.3rem);
      font-size: 10px;;
      width: fit-content;
      z-index: 1;
      padding: 0 5px;
      background: white;
      border-radius: 4px;
    }
  }

  &__input {
    position: relative;
    background: transparent;
  }
}
</style>