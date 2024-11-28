import Input, { type IProps } from '@/components/ui/Input.vue'
import type { Meta, StoryFn } from '@storybook/vue3';
import IconTablerSearch from '~icons/tabler/search'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'warning', 'success', 'danger']
    },
    modelValue: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    type: { control: 'select', options: ['text', 'password'] },
    placeholder: { control: 'text' },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: `
    <Input v-bind="args" v-model="args.modelValue">
      <template v-if="args.prefix" #prefix>
        {{ args.prefix }}
      </template>

      <template v-if="args.suffix" #suffix>
        {{ args.suffix }}
      </template>
    </Input>`,
});

const defaultArgs: IProps = {
  label: 'Input Text',
  rounded: 'md',
  size: 'md',
  modelValue: ''
}

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  ...defaultArgs
};

export const Outline = Template.bind({})
Outline.args = {
  variant: 'primary',
  outline: true,
  ...defaultArgs
};

export const TopLabel = Template.bind({})
TopLabel.args = {
  variant: 'primary',
  outline: true,
  topLabel: true,
  ...defaultArgs
};

export const Prefix = Template.bind({})
Prefix.args = {
  variant: 'primary',
  outline: true,
  topLabel: true,
  prefix: '$',
  ...defaultArgs
};

export const Suffix = Template.bind({})
Suffix.args = {
  variant: 'primary',
  outline: true,
  topLabel: true,
  suffix: 'Search',
  ...defaultArgs
};


export const PrefixAction = Template.bind({})
PrefixAction.args = {
  variant: 'primary',
  outline: true,
  prefix: 'Click me',
  placeholder: 'Search..',
  prefixAction: () => alert('Prefix Action'),
  ...defaultArgs
};

export const SuffixAction = Template.bind({})
SuffixAction.args = {
  variant: 'primary',
  suffix: 'Click me',
  suffixAction: () => alert('Suffix Action'),
  ...defaultArgs
};

export const PrefixIcon = Template.bind({})
PrefixIcon.args = {
  variant: 'primary',
  outline: true,
  prefixIcon: IconTablerSearch,
  ...defaultArgs
};

export const SuffixIcon = Template.bind({})
SuffixIcon.args = {
  variant: 'primary',
  suffixIcon: IconTablerSearch,
  ...defaultArgs
};

export const Textarea = Template.bind({})
Textarea.args = {
  variant: 'primary',
  type: 'textarea',
  ...defaultArgs
};