// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const SentimentChart = ({ sentimentData }) => {
//   const data = {
//     labels: ['Agree', 'Neutral', 'Disagree'],
//     datasets: [
//       {
//         data: sentimentData,
//         backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
//       },
//     ],
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold mb-4">Sentiment Analysis</h2>
//       <Pie data={data} />
//     </div>
//   );
// };

// export default SentimentChart;


import React from 'react';
import { Pie } from 'react-chartjs-2'; // Example using chart.js

const SentimentChart = ({ sentimentData }) => {
  const data = {
    labels: ['Agree', 'Neutral', 'Disagree'],
    datasets: [
      {
        data: sentimentData,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFB300', '#D32F2F'],
      },
    ],
  };

  return (
    <div>
      <h3>Sentiment Analysis Chart</h3>
      <Pie data={data} />
    </div>
  );
};

export default SentimentChart;
