import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
{/* Importing a logo image from src/asset/LOGO.png */}
import logo from '../src/assets/LOGO.png';
export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <header>
          <img src={logo} alt="Logo" className="logo" />
          <h1>My Portfolio</h1>
          <nav>
            {/* Navigation Links with class for CSS */}
            <Link to="/" className="home">Home</Link> |
            <Link to="/about" className="about">About JAT</Link> |
            <Link to="/education" className="education">Education</Link> |
            <Link to="/project" className="project">Project</Link> |
            <Link to="/contact" className="contact">Contact Me</Link>
            | <Link to="/services" className="services">Services</Link>
           

          </nav>
        </header>

        <hr />

        <main>
          <Outlet />
          {/* This is where the routed components will be rendered */}
        </main>

        <hr />

        <footer>
          <p>&copy; 2025 My Portfolio. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import './Layout.css';
// {/* Importing a logo image from src/asset/LOGO.png */}
// import logo from '../src/assets/LOGO.png';

// export default function Layout() {
//   return (
//     <>
//       <div className="wrapper">
//         <header>
//           <img src={logo} alt="JAT Logo" className="logo" />
//           {/* Changed header title from 'My Portfolio' to the application name */}
//           <h1>Job Application Tracker (JAT)</h1>
//           <nav>
//             {/* Navigation Links for a Job Tracking App */}
            
//             <Link to="/" className="home">Dashboard</Link> {/* Revised: Home page is now the main tracking dashboard */}
//             |
//             {/* Added: Link for adding a new application */}
//             <Link to="/add-job" className="add-job">Add New Application</Link>
//             |
//             {/* Removed: '/education' and '/project' (not needed for a tracking app) */}
            
//             {/* Revised: '/about' now links to the app description */}
//             <Link to="/about" className="about-app">About JAT</Link> 
//             |
//             {/* Added: Link for user profile/settings */}
//             <Link to="/profile" className="profile">Profile/Settings</Link>
            
//             {/* Removed: '/contact' and '/services' (usually less critical for an internal tool) */}

//           </nav>
//         </header>

//         <hr />

//         <main>
//           <Outlet />
//           {/* This is where the routed components (Dashboard, Add Job, etc.) will be rendered */}
//         </main>

//         <hr />

//         <footer>
//           {/* Revised footer text */}
//           <p>&copy; 2025 Job Application Tracker. All rights reserved.</p>
//         </footer>
//       </div>
//     </>
//   );
// }