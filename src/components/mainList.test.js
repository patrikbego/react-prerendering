import React from 'react';
import MainList from './mainList';
import {render, screen} from "@testing-library/react";

it('renders empty mainList component correctly', () => {
  const tree = render(<MainList list/>);
  expect(tree).toMatchSnapshot();


  expect(
    screen.getByText("Loading ...")
  ).toBeInTheDocument();
});

it('renders mainList component correctly', () => {
  const list1 = [{id: 'test.md', date: '2020-01-01', title: 'test'}]
  const tree = render(<MainList postsData={list1}/>);
  expect(tree).toMatchSnapshot();


  expect(
    screen.getByText("January 1, 2020")
  ).toBeInTheDocument();
});

