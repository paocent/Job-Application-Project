import { render, screen } from '@testing-library/react';
// We use MemoryRouter instead of BrowserRouter for testing, 
// as it allows us to simulate routing without a real browser environment.
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout'; // Assuming Layout.jsx is in the same folder

// Since the logo is imported as an image, Jest will handle it 
// based on your 'jest-transform-stub' setup.

describe('Layout Component', () => {
  
  // Test 1: Check if the header, navigation, and footer are rendered
  test('renders the header, navigation, and footer structure', () => {
    // Wrap the component in <MemoryRouter> to enable <Link> elements to work
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Assertions for the main sections
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Checks for the <header> tag
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // Checks for the <nav> tag
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Checks for the <footer> tag
    expect(screen.getByRole('main')).toBeInTheDocument(); // Checks for the <main> tag
  });
  
  // ---
  
  // Test 2: Check the logo and application title
  test('renders the application title and logo image', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Assertion for the main title (H1)
    const title = screen.getByRole('heading', { name: /Job Application Tracker \(JAT\)/i });
    expect(title).toBeInTheDocument();

    // Assertion for the logo image
    const logoImage = screen.getByRole('img', { name: /Logo/i }); // Checks the alt="Logo" text
    expect(logoImage).toBeInTheDocument();
    // You can optionally check the class name for CSS styling
    expect(logoImage).toHaveClass('logo'); 
  });
  
  // ---
  
  // Test 3: Check all navigation links (text and routes)
  test('renders all five navigation links with correct paths', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Find all links by their role
    const links = screen.getAllByRole('link');
    
    // Check that there are exactly 5 links in the layout
    expect(links).toHaveLength(5); 

    // Check each link text and its destination (href attribute)
    
    // Home Link
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    // About JAT Link
    const aboutLink = screen.getByText('About JAT');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    // Testimonials Link
    const projectLink = screen.getByText('Testimonials');
    expect(projectLink).toBeInTheDocument();
    expect(projectLink).toHaveAttribute('href', '/project');

    // Contact Us Link
    const contactLink = screen.getByText('Contact Us');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
    
    // Services Link
    const servicesLink = screen.getByText('Services');
    expect(servicesLink).toBeInTheDocument();
    expect(servicesLink).toHaveAttribute('href', '/services');
  });

  // ---

  // Test 4: Check the footer text
  test('renders the correct copyright information in the footer', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    
    // Check the text content within the footer (contentinfo) area
    expect(screen.getByText(/© 2025 Job Application Tracker/i)).toBeInTheDocument();
  });
});