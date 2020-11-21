import React from 'react';
import DateC from './date';
import {render} from "@testing-library/react";

it('renders date component correctly', () => {
  const tree = render(<DateC dateString={"2020-01-01"}/>);
  expect(tree).toMatchSnapshot();
});

it('checks the date string is in right format', () => {
  try {
    render(<DateC dateString={'05 October 2011 14:48 UTC'}/>);
  } catch (e) {
    if (e instanceof RangeError) {
      console.log("RangeError caught in test")
    } else {
      throw e;
    }

    expect(e.message).toBe("Invalid time value") ;
  }
});

it('checks the date string is in right format 1', () => {
  expect(() => {
    render(<DateC dateString={'1600895152284'}/>);
  }).toThrow("Invalid time value")
});
