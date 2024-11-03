import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { mockDatabase } from "../../util/mockAPI";
import TodoList from "../TodoList";

Enzyme.configure({ adapter: new Adapter() });

describe("TodoList", () => {
  it("renders properly", () => {
    const component = shallow(<TodoList todos={mockDatabase.todos} />);
    expect(component).toMatchSnapshot();
  });
});
