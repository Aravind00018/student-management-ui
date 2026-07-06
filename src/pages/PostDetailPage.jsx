import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, deletePost } from '../blogApi';
import { useAuth } from '../context/AuthContext';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id)
      .then((res) => setPost(res.data))
      .catch(() => navigate('/blog'));
  }, [id]);

  function handleDelete() {
    if (!window.confirm('Delete this post?')) return;
    deletePost(id)
      .then(() => navigate('/blog'))
      .catch(() => alert('Failed to delete'));
  }

  if (!post) return (
    <div className="flex justify-center mt-12">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/blog')}
        className="text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1 text-sm">
        ← Back to Blog
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-6">
          By <span className="font-medium text-gray-600">{post.authorUsername}</span>
          {' · '}{new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {user && user.username === post.authorUsername && (
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate(`/blog/${post.id}/edit`)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Edit Post
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetailPage;