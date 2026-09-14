import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("smoke test", () => {
  it("renders_a_simple_element", () => {
    function SmokeComponent() {
      return React.createElement("div", null, "smoke test ok");
    }

    render(React.createElement(SmokeComponent));
    expect(screen.getByText("smoke test ok")).toBeInTheDocument();
  });
});
