// 1. Import necessary functions from React and Testing Library
import { render, screen } from '@testing-library/react';
// 2. Import the component you want to test
import Home from './home'; // Simple dot-slash (./) means 'in the same folder'

// We use 'describe' to group related tests together
describe('Home Component', () => {

  // Test 1: Renders all main text elements and headings
  test('renders all main content including the title, welcome, and footer', () => {
    // 3. RENDER the component into a virtual DOM (Document Object Model)
    render(<Home />);

    // 4. ASSERTION: Check if the main heading is present
    const mainHeading = screen.getByRole('heading', { name: /Job Application Tracker \(JAT\)/i });
    expect(mainHeading).toBeInTheDocument();

    // 5. ASSERTION: Check if a prominent welcome message is displayed
    // We escape the asterisks (\*\*) because they are rendered literally in the DOM
    const welcomeText = screen.getByText(/Welcome to \*\*JAT\*\*!/i);
    expect(welcomeText).toBeInTheDocument();

    // NEW ASSERTION: Check the explanatory paragraph
    const explanationText = screen.getByText(/Tired of spreadsheets?/i);
    expect(explanationText).toBeInTheDocument();

    // 6. ASSERTION: Check if the 'What you can do here' section is present
    const featuresHeading = screen.getByRole('heading', { name: /What you can do here:/i });
    expect(featuresHeading).toBeInTheDocument();
    
    // NEW ASSERTION: Check the footer/closing statement
    const footerText = screen.getByText(/Get organized and land your next role faster!/i);
    expect(footerText).toBeInTheDocument();
  });

  // --- NEW TEST CASE ---
  // Test 2: Checks the list structure and items
  test('renders exactly three feature list items', () => {
    render(<Home />);
    
    // ASSERTION 1: Use getAllByRole to find all <li> elements
    const listItems = screen.getAllByRole('listitem');
    
    // Check that there are exactly 3 items in the list
    expect(listItems).toHaveLength(3); 
    
    // ASSERTION 2: Check all three specific features are present
    // Note: We include the literal asterisks (\*\*) in the regex for the list items too
    expect(screen.getByText(/\*\*Add new applications\*\*/i)).toBeInTheDocument();
    expect(screen.getByText(/\*\*Update the status\*\*/i)).toBeInTheDocument();
    expect(screen.getByText(/\*\*Set reminders\*\*/i)).toBeInTheDocument();
  });

  // --- NEW TEST CASE ---
  // Test 3: Checks for the main container class (ensuring layout structure)
  test('renders the content inside the expected container', () => {
    render(<Home />);
    
    // ASSERTION: Use getByRole on the container element
    // The main container is not an easily identifiable element (like a button or link),
    // so we search for a unique class name using querySelector.
    const container = document.querySelector('.content-container');
    expect(container).toBeInTheDocument();
    
    // You can optionally assert that the main heading is indeed inside this container
    const mainHeading = screen.getByRole('heading', { name: /Job Application Tracker/i });
    expect(container).toContainElement(mainHeading);
  });
});