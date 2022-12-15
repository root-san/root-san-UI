import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../components/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'componets/Button',
  component: Button
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const HasBackground = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HasBackground.args = {
  icon: <img src="src/assets/react.svg" />,
  title: 'title',
  description: 'description',
  onClick: () => { console.log('clicked!') },
  hasBackground: true
}

export const NoBackground = Template.bind({})
NoBackground.args = {
  ...HasBackground.args,
  hasBackground: false
}
