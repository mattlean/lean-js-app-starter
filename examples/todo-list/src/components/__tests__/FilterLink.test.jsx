import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { mockDatabase } from "../../util/mockAPI";
import FilterLink from "../FilterLink";

Enzyme.configure({ adapter: new Adapter() });

describe("FilterLink", () => {
  it("renders properly", () => {
    const component = shallow(<FilterLink todos={mockDatabase.todos} />);
    expect(component).toMatchSnapshot();
  });
});
