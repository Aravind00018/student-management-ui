import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../StudentCard';
import { getAllStudents, deleteStudent } from '../studentApi';

function HomePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchStudents(); }, []);

  function fetchStudents() {
    setLoading(true);
    getAllStudents()
      .then((res) => { setStudents(res.data.content); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function handleDelete(id) {
    deleteStudent(id).then(() => fetchStudents());
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Students</h1>
          <button
            onClick={() => navigate('/add')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Add Student
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-400 mt-8">No students yet. Add one!</p>
        ) : (
          students.map((s) => (
            <StudentCard
              key={s.id}
              name={s.name}
              email={s.email}
              age={s.age}
              onDelete={() => handleDelete(s.id)}
              onView={() => navigate(`/students/${s.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;