import React from "react";
import { shallow } from "enzyme";
import ChangeCalculator from "./ChangeCalculator";

it("renders correctly", () => {
  const wrapper = shallow(<ChangeCalculator />);
  expect(wrapper.find("#txtAmount")).toHaveLength(1);
});
