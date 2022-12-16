import { ComponentStory, ComponentMeta } from '@storybook/react'

import Modal from '../components/Modal'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'componets/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args} />
)

export const OpenModal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
OpenModal.args = {
  children: <img src="src/assets/react.svg" alt="" />,
  title: 'title',
  open: true,
}
