import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../blogApi';
import { useAuth } from '../context/AuthContext';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Fixed: Authentication guard safely runs inside useEffect after rendering
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // If there's no logged-in user, prevent rendering the form layout below
  if (!user) {
    return null;
  }

  function handleSubmit() {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    createPost({ title, content })
      .then(() => navigate('/blog'))
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to create post');
      });
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Write a Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Give your post a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
              Publish Post
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;