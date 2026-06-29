import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // We will use axios directly to bypass the missing export error

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Calling your backend directly just like your working code did originally
    axios.get(`http://localhost:8081/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch(() => navigate('/'));
  }, [id]);

  if (!student) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Details</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">ID</span>
              <span className="text-gray-800">{student.id}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Name</span>
              <span className="text-gray-800">{student.name}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-800">{student.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Age</span>
              <span className="text-gray-800">{student.age}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-colors">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default StudentDetailPage;