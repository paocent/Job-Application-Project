// client/router-mock.js

// This file provides simple dummy components for Link and Outlet, 
// so Jest can load the Layout component without the real router logic.
import React from 'react';

// Use a simple function to mock Link, passing through the 'to' prop as 'href' for testing
export const Link = React.forwardRef(({ to, children, ...rest }, ref) => (
  <a href={to} ref={ref} {...rest}>
    {children}
  </a>
));
Link.displayName = 'MockLink';

// Mock Outlet as a simple div or null since its output isn't needed for Layout tests
export const Outlet = () => <div data-testid="outlet-content">Outlet</div>;

// Export MemoryRouter and BrowserRouter as they are needed for wrapping the test
export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const BrowserRouter = ({ children }) => <div>{children}</div>;