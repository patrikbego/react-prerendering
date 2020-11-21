import { render, screen } from "@testing-library/react";
import App from "../src/pages/index";
import React from 'react'
import {getServerSideProps} from "../src/pages";

const user = {name: 'Patrik', surname: 'Bego', about:'Philosopher|Entrepreneur|Code and Life hacker', siteTitle: 'My new blog'};

describe("App", () => {
  it("renders empty list without crashing", () => {
    render(<App blogger={user}/>);
    expect(
      screen.getByText("Loading ...")
    ).toBeInTheDocument();
  });


  it("renders without crashing", () => {

    const list1 = [{id: 'test.md', date: '2021-01-01', title: 'test'}];

    render(<App allPostsData={list1} blogger={user}/>);
    expect(
      screen.getByText("January 1, 2021")
    ).toBeInTheDocument();
  });

  it("renders data list", async () => {

    let mockResponse1 = JSON.stringify({
      0: "test.md"
    });
    fetch.mockResponseOnce(mockResponse1);
    let mockResponse = JSON.stringify({mddata: "test"});
    fetch.mockResponseOnce(mockResponse);
    const response = await getServerSideProps();
    expect(response.props.allPostsData[0].id).toEqual("test")
  });
});
