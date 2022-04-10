import { mount } from "@vue/test-utils";
import Header from "../../src/components/Header.vue";

describe("Testing Component Methods", () => {
  it("updates url", () => {
    const wrapper = mount(Header, {
      stubs: ["router-link"],
    });
    expect(wrapper.vm.normalize("My Products")).toBe("my-products");
  });
});
