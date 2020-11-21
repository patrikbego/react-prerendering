import React from 'react';
import Layout from './layout';
import {render, screen} from "@testing-library/react";

const user = {name: 'Patrik', surname: 'Bego', about:'Philosopher|Entrepreneur|Code and Life hacker', siteTitle: 'My new blog'};

it('renders layout component correctly', () => {
  const tree = render(<Layout domov user={user}/>);
  expect(tree).toMatchSnapshot();

  expect(
    screen.getByRole("heading", { name: "Patrik" })
  ).toBeInTheDocument();
});


