import { ComponentStory, ComponentMeta } from '@storybook/react';
import { House } from './house';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default {
  component: House,
  title: '3DModel',
} as ComponentMeta<typeof House>;

const Template: ComponentStory<typeof House> = () => (
  <Canvas style={{ height: 500 }}>
    <House />
  </Canvas>
);

export const Primary = Template.bind({});
Primary.args = {};
