import React from 'react';
import Layout from './layout';
import {render, screen} from "@testing-library/react";

it('renders layout component correctly', () => {
  const tree = render(<Layout domov/>);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByRole("heading", { name: "[Your Name]" })
  ).toBeInTheDocument();
});


