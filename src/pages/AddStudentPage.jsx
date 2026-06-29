import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../studentApi';

function AddStudentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    if (!name || !email || !age) { setError('All fields are required'); return; }
    addStudent({ name, email, age: parseInt(age) })
      .then(() => navigate('/'))
      .catch((err) => {
        const msg = err.response?.data;
        setError(typeof msg === 'object' ? Object.values(msg).join(', ') : 'Failed to add student');
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Student</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors">
              Save Student
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudentPage;