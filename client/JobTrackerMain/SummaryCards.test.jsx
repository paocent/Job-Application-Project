import { render, screen } from '@testing-library/react';
import SummaryCards from './SummaryCards'; // Assuming test is in the same folder

describe('SummaryCards Component', () => {

  // Define a standard set of mock data to use for testing
  const mockProps = {
    total: 10,
    pending: 5,
    interviewing: 3,
    offers: 2,
  };

  // Test 1: Ensure all four cards are rendered
  test('renders exactly four summary cards', () => {
    render(<SummaryCards {...mockProps} />);

    // Get all elements by the text "Applications" or "Interviews" which is unique to the cards
    // A simpler approach is to find all <div> elements with a specific class or to check the number of <h2> tags.
    const headings = screen.getAllByRole('heading', { level: 2 });
    
    expect(headings).toHaveLength(4);
  });

  // ---

  // Test 2: Check that the correct counts and labels are displayed
  test('displays the correct counts and labels for all four metrics', () => {
    render(<SummaryCards {...mockProps} />);

    // 1. Total Applications Check
    // Get the count (10) by role and then check the corresponding label text.
    expect(screen.getByRole('heading', { name: '10' })).toBeInTheDocument();
    expect(screen.getByText('Total Applications')).toBeInTheDocument();

    // 2. Pending Applications Check
    expect(screen.getByRole('heading', { name: '5' })).toBeInTheDocument();
    expect(screen.getByText('Active Tracking')).toBeInTheDocument();

    // 3. Interviewing Applications Check
    expect(screen.getByRole('heading', { name: '3' })).toBeInTheDocument();
    expect(screen.getByText('Interviews Scheduled')).toBeInTheDocument();

    // 4. Offers Received Check
    expect(screen.getByRole('heading', { name: '2' })).toBeInTheDocument();
    expect(screen.getByText('Offers Received')).toBeInTheDocument();
  });
  
  // ---

  // Test 3: Check that the component renders correctly when counts are zero
  test('renders with zero counts without crashing', () => {
    const zeroProps = { total: 0, pending: 0, interviewing: 0, offers: 0 };
    render(<SummaryCards {...zeroProps} />);

    // Check that the zero counts are rendered
    expect(screen.getAllByRole('heading', { name: '0' })).toHaveLength(4);
    
    // Ensure the main container is present
    expect(document.querySelector('.summary-cards-container')).toBeInTheDocument();
  });
});