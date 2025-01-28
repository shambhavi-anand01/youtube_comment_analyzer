
import { useState } from 'react';
import axios from '../services/api';
import style from './InputForm.module.css';
import SentimentChart from './SentimentChart'; // Assuming you have the SentimentChart component

export default function InputForm() {
  const [videoLink, setVideoLink] = useState('');
  const [sentimentData, setSentimentData] = useState(null); // To store sentiment data
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX
  const [showChart, setShowChart] = useState(false); // To toggle between input form and chart

  const handleAnalyze = async () => {
    setIsLoading(true); // Start loading
    try {
      // Trigger the backend to analyze comments
      await axios.post('/comments/analyze', { videoLink });

      // Fetch sentiment summary
      const response = await axios.get('/comments/sentiment-summary');
      const sentimentCounts = [response.data.agree, response.data.neutral, response.data.disagree];

      // Update state with new sentiment data and show the chart
      setSentimentData(sentimentCounts);
      setShowChart(true);
    } catch (error) {
      console.error('Error analyzing comments:', error.response ? error.response.data : error.message);
      alert('Error analyzing comments. Check the console for details.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-6">
      {!showChart ? (
        // Show Input Form
        <div className={style.inputFormContainer}>
          <h1 className="font-bold text-2xl mb-4 text-gray-700">YouTube Comment Analyzer</h1>
          <p>Enter a YouTube video URL to analyze its comments.</p>
          <input
            type="text"
            placeholder="Enter YouTube video link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={handleAnalyze}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Comments'}
          </button>
        </div>
      ) : (
        // Show Sentiment Chart
        <div className="text-center">
          <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: 'black',
        color: '#fff',
        borderRadius: '0px',
        textAlign: 'left'
      }}>
            <h1 className="font-bold text-2xl mb-4 text-gray-700">Sentiment Analysis Results</h1>
          </div>
          <SentimentChart sentimentData={sentimentData} />
        </div>
      )}
    </div>
  );
}