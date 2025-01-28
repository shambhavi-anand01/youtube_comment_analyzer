
import React from 'react';
// import { useEffect, useRef } from 'react';
// import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2'; // Example using chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


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
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <h3>Sentiment Analysis Chart</h3>
      <Pie data={data} />
    </div>
  );
};

export default SentimentChart;


// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// const SentimentChart = ({ sentimentData, commentDistribution }) => {
//   const { agree, neutral, disagree, totalComments } = sentimentData;
//   const safeCommentDistribution = commentDistribution || [];
//   const pieData = {
//     labels: ["Agree", "Neutral", "Disagree"],
//     datasets: [
//       {
//         data: [agree, neutral, disagree],
//         backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
//         hoverBackgroundColor: ["#388E3C", "#FFB300", "#D32F2F"],
//       },
//     ],
//   };

//   const barData = {
//     labels: safeCommentDistribution.map((data) => data.month),
//     datasets: [
//       {
//         label: "Comments",
//         data: safeCommentDistribution.map((data) => data.comments),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ padding: "20px", color: "#fff" }}>
//       <h1>Analysis Results</h1>

//       {/* Sentiment Analysis */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//         <div>
//           <h2>Sentiment Analysis</h2>
//           <p>Agree: {agree}%</p>
//           <p>Neutral: {neutral}%</p>
//           <p>Disagree: {disagree}%</p>
//         </div>
//         <div>
//           <h2>Total Comments</h2>
//           <h1>{totalComments}</h1>
//         </div>
//         <div style={{ width: "300px", height: "300px" }}>
//           <Pie data={pieData} />
//         </div>
//       </div>

//       {/* Comment Distribution */}
//       <div style={{ marginTop: "20px" }}>
//         <h2>Comment Distribution</h2>
//         <div style={{ width: "100%", height: "300px" }}>
//           <Bar data={barData} options={barOptions} />
//         </div>
//       </div>

//       {/* Back Button */}
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={() => window.history.back()}
//           style={{
//             padding: "10px 20px",
//             cursor: "pointer",
//             backgroundColor: "#4CAF50",
//             border: "none",
//             color: "#fff",
//             borderRadius: "5px",
//           }}
//         >
//           Back to Input
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SentimentChart;
