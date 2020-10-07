import React from 'react';
import {render, screen} from "@testing-library/react";
import ShareFooter from "./shareFooter";

it('renders mainList component correctly', () => {
  const mockData = {shareUrl: 'test1', imageUrl: 'test2', title: 'test'}
  const tree = render(<ShareFooter postData={mockData}/>);
  expect(tree).toMatchSnapshot();

  // expect(
  //   tree.getAllByRole('button', {'aria-label': '[facebook]'})
  // ).toBeInTheDocument();
});

it('renders mainList component in-correctly', () => {
  expect(() => {
    render(<ShareFooter/>);
  }).toThrow("Cannot read property 'shareUrl' of undefined")
});
