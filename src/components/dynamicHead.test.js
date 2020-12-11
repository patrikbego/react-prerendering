import {render} from "@testing-library/react";
import DynamicHead from "./DynamicHead";
import React from "react";

it('renders Dynamic component correctly', () => {
    const mockData ={
            title: "fileName",
            description: "test description",
            keywords: "NI at the moment",
            image: "/images/profile.jpg"
        }
    const tree = render(<DynamicHead meta={mockData}/>);
    expect(tree).toMatchSnapshot();

    // expect(
    //   tree.getAllByRole('button', {'aria-label': '[facebook]'})
    // ).toBeInTheDocument();
});

it('renders DynamicHead component in-correctly', () => {
    expect(() => {
        render(<DynamicHead/>);
    }).toThrow("Cannot read property 'title' of undefined")
});
