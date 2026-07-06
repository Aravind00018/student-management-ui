import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, updatePost } from '../blogApi';
import { useAuth } from '../context/AuthContext';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getPostById(id).then((res) => {
      if (res.data.authorUsername !== user?.username) {
        navigate('/blog');
        return;
      }
      setTitle(res.data.title);
      setContent(res.data.content);
    }).catch(() => navigate('/blog'));
  }, [id]);

  function handleUpdate() {
    if (!title || !content) {
      setError('Both fields are required');
      return;
    }
    updatePost(id, { title, content })
      .then(() => navigate(`/blog/${id}`))
      .catch(() => setError('Failed to update post'));
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-48 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
              Save Changes
            </button>
            <button
              onClick={() => navigate(`/blog/${id}`)}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostPage;