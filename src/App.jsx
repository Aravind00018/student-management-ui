import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import StudentDetailPage from './pages/StudentDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogFeedPage from './pages/BlogFeedPage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddStudentPage />} />
            <Route path="/students/:id" element={<StudentDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blog" element={<BlogFeedPage />} />
            <Route path="/blog/:id" element={<PostDetailPage />} />
            <Route path="/blog/:id/edit" element={<EditPostPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;