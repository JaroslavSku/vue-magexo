import { mount } from "@vue/test-utils";
import ProductItem from "../../src/components/ProductItem.vue";

describe("Testing ProductItem component", () => {
  it("checks the prop title", () => {
    const wrapper = mount(ProductItem, {
      propsData: {
        title: "Products",
      },
    });
    expect(wrapper.props().title).toBe("Products");
  });

  it("checks displaying the title", () => {
    const wrapper = mount(ProductItem, {
      propsData: {
        title: "Products",
      },
    });
    expect(wrapper.element.textContent).toBe("Products");
  });
});
