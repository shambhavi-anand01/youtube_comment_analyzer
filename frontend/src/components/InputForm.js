import { useState } from 'react';
import axios from '../services/api';


const Button = ({ children, onClick }) => (
    <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
  
  export { Button };
  export default function InputForm({ onAnalyze }) {
  const [videoLink, setVideoLink] = useState('');

  const handleAnalyze = async () => {
   
    try {
      const response = await axios.post('/comments/analyze', { videoLink });
      onAnalyze(response.data);
    } catch (error) {
      console.error('Error analyzing comments:', error.response ? error.response.data : error.message);
      alert('Error analyzing comments. Check the console for details.');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter YouTube video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <Button onClick={handleAnalyze}>Analyze Comments</Button>
    </div>
  );
}