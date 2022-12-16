import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import CardButton from '../components/CardButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'componets/CardButton',
  component: CardButton,
} as ComponentMeta<typeof CardButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardButton> = (args) => (
  <CardButton {...args} />
)

export const HasBackground = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HasBackground.args = {
  icon: <img src="src/assets/react.svg" alt="" />,
  title: 'title',
  description: 'description',
  onClick: () => {
    console.log('clicked!')
  },
  hasBackground: true,
}

export const NoBackground = Template.bind({})
NoBackground.args = {
  ...HasBackground.args,
  hasBackground: false,
}
