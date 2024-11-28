import Switch, { type IProps } from '@/components/ui/Switch.vue'
import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'warning', 'success', 'danger']
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPlacement: { control: 'select', options: ['top', 'left'] },
  },
} as Meta<typeof Switch>;
  
const Template: StoryFn<typeof Switch> = (args) => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: `
      <Switch v-bind="args" v-model="args.modelValue"/>`,
});
  
const defaultArgs: IProps = {
  label: 'Switch',
  size: 'md',
  modelValue: false,
}
  
export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  ...defaultArgs
};