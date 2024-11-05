import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import Todo from "../Todo";

Enzyme.configure({ adapter: new Adapter() });

describe("Todo", () => {
  it("renders properly", () => {
    const component = shallow(<Todo />);
    expect(component).toMatchSnapshot();
  });
});
