import React from 'react';
import { shallow } from "enzyme";

import Icon from './Icon';

describe("Smile icon", () => {
  it("renders selected", () => {
    const component = shallow(<Icon type={1} isSelected={true}/>);

    expect(component.html()).toBe('<i style="color:green" class="fas fa-smile"></i>');
  });

  it("renders not selected", () => {
    const component = shallow(<Icon type={1} isSelected={false}/>);

    expect(component.html()).toBe('<i style="color:green" class="far fa-smile"></i>');
  });
});

describe("Meh icon", () => {
  it("renders selected", () => {
    const component = shallow(<Icon type={0} isSelected={true}/>);

    expect(component.html()).toBe('<i style="color:#dcdc48" class="fas fa-meh"></i>');
  });

  it("renders not selected", () => {
    const component = shallow(<Icon type={0} isSelected={false}/>);

    expect(component.html()).toBe('<i style="color:#dcdc48" class="far fa-meh"></i>');
  });
});

describe("Frown icon", () => {
  it("renders selected", () => {
    const component = shallow(<Icon type={-1} isSelected={true}/>);

    expect(component.html()).toBe('<i style="color:red" class="fas fa-frown"></i>');
  });

  it("renders not selected", () => {
    const component = shallow(<Icon type={-1} isSelected={false}/>);

    expect(component.html()).toBe('<i style="color:red" class="far fa-frown"></i>');
  });
});
