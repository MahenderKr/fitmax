// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
import About from './components/About';
import BookAppointment from './components/BookAppointment';
import BloodReportAnalyzer from './components/BloodReportAnalyzer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages below */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Home />} /> 
          <Route path="about" element={<About />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="blood-report" element={<BloodReportAnalyzer  />} /> {/* Fallback to Home for unknown routes */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
