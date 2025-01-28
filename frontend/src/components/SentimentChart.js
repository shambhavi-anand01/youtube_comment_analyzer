
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ sentimentData }) => {
  if (!sentimentData || sentimentData.length < 3) {
    return <p>Loading sentiment data...</p>;
  }

  const [agree, neutral, disagree] = sentimentData;
  const totalComments = agree + neutral + disagree;

  // Prevent division by zero for percentage calculation
  const agreePercent = totalComments ? ((agree / totalComments) * 100).toFixed(2) : 0;
  const neutralPercent = totalComments ? ((neutral / totalComments) * 100).toFixed(2) : 0;
  const disagreePercent = totalComments ? ((disagree / totalComments) * 100).toFixed(2) : 0;

  const data = {
    labels: ['Agree', 'Neutral', 'Disagree'],
    datasets: [
      {
        data: [agree, neutral, disagree],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFB300', '#D32F2F'],
      },
    ],
  };

  return (

    <div style={{ width: '100%', margin: '0 auto', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '120px' }}>
    
    {/* Pie Chart Section */}
    <div style={{ width: '350px', marginTop: '20px'}}>
      <h3>Sentiment Analysis Chart</h3>
      <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <Pie data={data} />
      </div>
    </div>

      {/* Sentiment Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '15px',
        background: '#000080',
        color: '#fff',
        borderRadius: '10px',
        textAlign: 'left',
        gap: '60px'
      }}>
        <div>
          <h2 className="text-lg font-bold">Sentiment Analysis</h2>
          <p>✅ Agree: <strong>{agree}</strong> ({agreePercent}%)</p>
          <p>⚖️ Neutral: <strong>{neutral}</strong> ({neutralPercent}%)</p>
          <p>❌ Disagree: <strong>{disagree}</strong> ({disagreePercent}%)</p>
        </div>
        <div style={{ marginTop: '20px'}}>
          <h2 className="text-lg font-bold">Total Comments</h2>
          <h1 className="text-2xl font-extrabold">{totalComments}</h1>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;

