import React from 'react';
import { shallow } from "enzyme";
import Counter from './Counter';

it("matches the snapshot", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);

  expect(wrapper).toMatchSnapshot();
});

it("handles reset updates", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);
  const instance = wrapper.instance();

  wrapper.setState({ members: [
    { id: 1, vote: 1 },
    { id: 2, vote: 0 },
  ]});

  instance.handleSubscribe({ name: 'reset' });

  expect(wrapper.state().members).toEqual([
    { id: 1, vote: null },
    { id: 2, vote: null },
  ]);
});

it("handles add_vote updates", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);
  const instance = wrapper.instance();

  wrapper.setState({ members: [
    { id: 1, vote: null },
    { id: 2, vote: null },
  ]});

  instance.handleSubscribe({ name: 'add_vote', connectionId: 1, data: { vote: 1 }});

  expect(wrapper.state().members).toEqual([
    { id: 1, vote: 1 },
    { id: 2, vote: null },
  ]);
});

it("handles member updates", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);
  const instance = wrapper.instance();

  wrapper.setState({ members: [
    { id: 1, vote: null },
    { id: 2, vote: 0 },
    { id: 3, vote: null },
  ]});

  instance.updateMembers([
    { connectionId: 1 },
    { connectionId: 2 },
  ]);

  expect(wrapper.state().members).toEqual([
    { id: 1, vote: null },
    { id: 2, vote: 0 },
  ]);
});

it("doesn't show the result until everyone votes", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);

  wrapper.setState({ members: [
    { id: 1, vote: null },
    { id: 2, vote: 0 },
    { id: 3, vote: 0 },
  ]});

  const resultDiv = wrapper.find('div.result');

  expect(resultDiv.text()).toBe('-');
});

it("shows the lowest result", () => {
  const wrapper = shallow(<Counter channelUuid={1000} />);

  wrapper.setState({ members: [
    { id: 1, vote: 1 },
    { id: 2, vote: 1 },
    { id: 3, vote: 0 },
    { id: 4, vote: 1 },
    { id: 5, vote: -1 },
  ]});

  const resultDiv = wrapper.find('div.result');

  // red frown face
  expect(resultDiv.childAt(0).html()).toBe('<i style="color:red" class="far fa-frown"></i>');
});
