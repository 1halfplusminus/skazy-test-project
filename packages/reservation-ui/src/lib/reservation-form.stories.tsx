import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReservationForm } from './reservation-form';

export default {
  component: ReservationForm,
  title: 'ReservationUi',
} as ComponentMeta<typeof ReservationForm>;

const Template: ComponentStory<typeof ReservationForm> = (args) => (
  <ReservationForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
