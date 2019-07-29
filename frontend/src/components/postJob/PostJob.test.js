import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostJob from './PostJob';

it('ensure input are capitalised', () => {
    const { getByTestId } = render(<PostJob />);

    // fill out the form
    fireEvent.change(getByTestId('title'), {target: {value: 'manager'}})
    expect(getByTestId('title').value).toBe('Manager')
    fireEvent.change(getByTestId('job_description'), {target: {value: 'managing team meetings'}})
    expect(getByTestId('job_description').value).toBe('Managing team meetings')
    fireEvent.change(getByTestId('location'), {target: {value: 'melbourne'}})
    expect(getByTestId('location').value).toBe('Melbourne')

})