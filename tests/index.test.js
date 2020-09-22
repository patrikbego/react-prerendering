import { render, screen } from "@testing-library/react";
import App from "../pages/index";
import React from 'react'
import {getServerSideProps} from "../pages";

describe("App", () => {
  it("renders empty list without crashing", () => {
    render(<App />);
    expect(
      screen.getByText("Loading ...")
    ).toBeInTheDocument();
  });


  it("renders without crashing", () => {

    const list1 = [{id: 'test.md', date: '2021-01-01', title: 'test'}]

    render(<App allPostsData={list1}/>);
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
