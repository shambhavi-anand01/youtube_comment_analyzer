import { useState } from 'react';
import axios from '../services/api';
import style from './InputForm.module.css';
import SentimentChart from './SentimentChart';

const Button = ({ children, onClick }) => (
    <button onClick={onClick} className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform">
      {children}
    </button>
  );
  
  export { Button };
  export default function InputForm({ onAnalyze }) {
  const [videoLink, setVideoLink] = useState('');
  const [sentimentData, setSentimentData] = useState(null);

  const handleAnalyze = async () => {
   
    try {
      const response = await axios.post('/comments/analyze', { videoLink });
      onAnalyze(response.data);

      //sentiment summary
      const sentimentSummary=await axios.get('/comments/sentiment-summary');
      setSentimentData([sentimentSummary.data.agree, sentimentSummary.data.neutral, sentimentSummary.data.disagree]);


    } catch (error) {
      console.error('Error analyzing comments:', error.response ? error.response.data : error.message);
      alert('Error analyzing comments. Check the console for details.');
    }
  };

  return (
    <div className={style.inputFormContainer}>
      <h1 className="font-bold mb-4 text-gray-700">YouTube Comment Analyzer</h1>
      <h5>Enter a YouTube video URL to analyze its comments.</h5>
      <input
        type="text"
        placeholder="Enter YouTube video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="border-2 border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />
      <Button onClick={handleAnalyze} className="btn">Analyze Comments</Button>
      {sentimentData && <SentimentChart sentimentData={sentimentData} />}
    </div>
  );
}


// import { useState } from 'react';
// import axios from '../services/api';
// import style from './InputForm.module.css';
// import SentimentChart from './SentimentChart';  // Assuming you have SentimentChart component

// const Button = ({ children, onClick }) => (
//   <button
//     onClick={onClick}
//     className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
//   >
//     {children}
//   </button>
// );

// export { Button };

// export default function InputForm() {
//   const [videoLink, setVideoLink] = useState('');
//   const [sentimentData, setSentimentData] = useState(null); // New state to store sentiment data

//   const handleAnalyze = async () => {
//     try {
//       const response = await axios.post('/comments/analyze', { videoLink });

//       // Assuming you have a backend endpoint '/comments/sentiment-summary' that gives sentiment data.
//       const sentimentSummary = await axios.get('/comments/sentiment-summary');

//       // Process the sentiment data to be in the format [agree, neutral, disagree]
//       const sentimentCounts = {
//         agree: 0,
//         neutral: 0,
//         disagree: 0,
//       };

//       // Summarize sentiment counts
//       sentimentSummary.data.forEach((item) => {
//         sentimentCounts[item._id] = item.count;
//       });

//       setSentimentData([sentimentCounts.agree, sentimentCounts.neutral, sentimentCounts.disagree]);

//     } catch (error) {
//       console.error('Error analyzing comments:', error.response ? error.response.data : error.message);
//       alert('Error analyzing comments. Check the console for details.');
//     }
//   };

//   return (
//     <div className={style.inputFormContainer}>
//       <h1 className="font-bold mb-4 text-gray-700">YouTube Comment Analyzer</h1>
//       <h5>Enter a YouTube video URL to analyze its comments.</h5>
//       <input
//         type="text"
//         placeholder="Enter YouTube video link"
//         value={videoLink}
//         onChange={(e) => setVideoLink(e.target.value)}
//         className="border-2 border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
//       />
//       <Button onClick={handleAnalyze}>Analyze Comments</Button>

//       {/* Display Sentiment Chart if data is available */}
//       {sentimentData && <SentimentChart sentimentData={sentimentData} />}
//     </div>
//   );
// }



// import { useState } from 'react';
// import axios from '../services/api';
// import style from './InputForm.module.css';
// import SentimentChart from './SentimentChart';  // Assuming you have SentimentChart component

// const Button = ({ children, onClick }) => (
//   <button
//     onClick={onClick}
//     className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-transform"
//   >
//     {children}
//   </button>
// );

// export { Button };

// export default function InputForm() {
//   const [videoLink, setVideoLink] = useState('');
//   const [sentimentData, setSentimentData] = useState(null); // State to store sentiment data

//   const handleAnalyze = async () => {
//     try {
//       // Step 1: Send video link to backend to analyze comments
//       await axios.post('/comments/analyze', { videoLink });

//       // Step 2: Fetch sentiment summary after comment analysis is done
//       const sentimentSummary = await axios.get('/comments/sentiment-summary');

//       // Step 3: Summarize sentiment data (agree, neutral, disagree)
//       const sentimentCounts = {
//         agree: sentimentSummary.data.agree,
//         neutral: sentimentSummary.data.neutral,
//         disagree: sentimentSummary.data.disagree,
//       };

//       // Set the sentiment data for chart rendering
//       setSentimentData([sentimentCounts.agree, sentimentCounts.neutral, sentimentCounts.disagree]);

//     } catch (error) {
//       console.error('Error analyzing comments:', error.response ? error.response.data : error.message);
//       alert('Error analyzing comments. Check the console for details.');
//     }
//   };

//   return (
//     <div className={style.inputFormContainer}>
//       <h1 className="font-bold mb-4 text-gray-700">YouTube Comment Analyzer</h1>
//       <h5>Enter a YouTube video URL to analyze its comments.</h5>
//       <input
//         type="text"
//         placeholder="Enter YouTube video link"
//         value={videoLink}
//         onChange={(e) => setVideoLink(e.target.value)}
//         className="border-2 border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
//       />
//       <Button onClick={handleAnalyze}>Analyze Comments</Button>

//       {/* Display Sentiment Chart if sentimentData is available */}
//       {sentimentData && <SentimentChart sentimentData={sentimentData} />}
//     </div>
//   );
// }
