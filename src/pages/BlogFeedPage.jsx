import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllPosts, deletePost } from '../blogApi';
import { useAuth } from '../context/AuthContext';

function BlogFeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    setLoading(true);
    getAllPosts()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  function handleDelete(id) {
    if (!window.confirm('Delete this post?')) return;
    deletePost(id)
      .then(() => fetchPosts())
      .catch(() => alert('Failed to delete post'));
  }

  if (loading) return (
    <div className="flex justify-center mt-12">
      <p className="text-gray-500">Loading posts...</p>
    </div>
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog</h1>
        {user && (
          <button
            onClick={() => navigate('/create-post')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Write Post
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No posts yet.</p>
          {user && (
            <button
              onClick={() => navigate('/create-post')}
              className="mt-4 text-blue-500 hover:underline">
              Be the first to write one!
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post.id}
              className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">
                    By <span className="font-medium text-gray-600">
                      {post.authorUsername}
                    </span> · {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 line-clamp-3">
                    {post.content.length > 150
                      ? post.content.substring(0, 150) + '...'
                      : post.content}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-500 hover:underline text-sm font-medium">
                  Read more →
                </Link>
                {user && user.username === post.authorUsername && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/blog/${post.id}/edit`)}
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded transition-colors">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogFeedPage;