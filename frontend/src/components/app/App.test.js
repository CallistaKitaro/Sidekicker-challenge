import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('redirects to post job page when navigation link is clicked', () => {
  const { getByText, queryByText } = render(<App />);
  fireEvent.click(getByText('Add Job'))
  expect(queryByText('Create New Job')).toBeTruthy();
})