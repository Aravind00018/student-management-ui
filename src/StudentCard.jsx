function StudentCard({ name, email, age, onDelete, onView }) {
  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">📧 {email}</p>
        <p className="text-sm text-gray-500">🎂 Age: {age}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded transition-colors">
          View
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;