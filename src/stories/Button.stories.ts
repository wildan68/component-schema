import Button from '@/components/ui/Button.vue'
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'warning', 'success', 'danger']
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    default: { control: 'text' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: `
    <Button v-bind="args">
      <template v-if="args.prefix" #prefix>
        {{ args.prefix }}
      </template>

      {{ args.label }}

      <template v-if="args.suffix" #suffix>
        {{ args.suffix }}
      </template>
    </Button>`,
});

const defaultArgs = {
  label: 'Button',
  rounded: 'md',
  size: 'md',
  type: 'button'
} as const

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  ...defaultArgs
};

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  ...defaultArgs
};

export const Waning = Template.bind({})
Waning.args = {
  variant: 'warning',
  ...defaultArgs
};

export const Success = Template.bind({})
Success.args = {
  variant: 'success',
  ...defaultArgs
};

export const danger = Template.bind({})
danger.args = {
  variant: 'danger',
  ...defaultArgs
};