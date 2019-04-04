import React from 'react';
import { shallow, mount } from "enzyme";
import Voter from './Voter';

it("matches the snapshot", () => {
  const wrapper = shallow(<Voter channelUuid={1000} />);

  expect(wrapper).toMatchSnapshot();
});

it("changes icon class on click", () => {
  const wrapper = mount(<Voter channelUuid={1000} />);

  const firstIconDiv = wrapper.find('div .column').at(0);

  firstIconDiv.simulate('click');

  expect(firstIconDiv.childAt(0).html()).toBe('<i style="color: green;" class="fas fa-smile"></i>');
});

it("calls handler when icon clicked", () => {
  const wrapper = mount(<Voter channelUuid={1000} />);

  const spy = jest.spyOn(wrapper.instance(), 'handleVote');

  wrapper.find('div .column').at(1).simulate('click');

  expect(spy).toHaveBeenCalledWith(0, expect.anything());
});

it("handles reset updates", () => {
  const wrapper = shallow(<Voter channelUuid={1000} />);
  const instance = wrapper.instance();

  wrapper.setState({ vote: 1 });

  instance.handleSubscribe({ name: 'reset' });

  expect(wrapper.state().vote).toBe(null);
});
