import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";
import App from './App';

it("renders without crashing", () => {
  const div = document.createElement('div');

  ReactDOM.render(<App />, div);
});

it("is created with empty role", () => {
  const component = create(<App />);
  const instance = component.getInstance();

  expect(instance.state.role).toBe('');
});

it("it matches the snapshot of initial page", () => {
  const component = create(<App />);

  expect(component.toJSON()).toMatchSnapshot();
});
