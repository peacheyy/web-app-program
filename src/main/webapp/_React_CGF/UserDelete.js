const UserDelete = () => {
  const [userId, setUserId] = React.useState('');
  const [message, setMessage] = React.useState('');

  const callDeleteAPI = async () => {
    if (!userId.trim()) {
      setMessage('Please enter a user ID');
      return;
    }

    setMessage('');

    try {
      const response = await fetch(`webUser/delete?userId=${userId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();

      if (!data.errorMsg) {
        setMessage(`Record ${userId} successfully deleted.`);
        setUserId(''); // Clear the input after successful deletion
      } else {
        setMessage(`Error: ${data.errorMsg}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while trying to delete the record.');
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Delete User</h3>
      <div className="flex items-center gap-2 mb-4">
        <span>Enter User ID:</span>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={callDeleteAPI}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Delete
        </button>
      </div>
      {message && (
        <div className="mt-4 p-4 border rounded">
          {message}
        </div>
      )}
    </div>
  );
};