import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import StudentDetailPage from './pages/StudentDetailPage';
import './index.css'; // Add this if missing to hook up TailwindS

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddStudentPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;