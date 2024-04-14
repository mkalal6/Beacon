import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CryptoChart = () => {
    const [crypto, setCrypto] = useState('bitcoin');
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Fetch data when 'crypto' changes
    useEffect(() => {
        const fetchCryptoData = async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7&interval=daily`);
            const data = await response.json();
            return data.prices.map(price => ({
                y: price[1].toFixed(2),
                t: new Date(price[0])
            }));
        };

        fetchCryptoData().then(data => {
            if (data && data.length > 0) {
                const chart = chartInstance.current;
                if (chart) {
                    chart.data.labels = data.map(dataItem => dataItem.t.toLocaleDateString());
                    chart.data.datasets[0].data = data.map(dataItem => parseFloat(dataItem.y));
                    chart.data.datasets[0].label = `Price of ${crypto.charAt(0).toUpperCase() + crypto.slice(1)} in USD`;
                    chart.update();
                }
            }
        });
    }, [crypto]);

    // Initialize chart
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const newChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: '',
                        data: [],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
            chartInstance.current = newChart;
            return () => {
                newChart.destroy();
            };
        }
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80vh', marginTop: '80px' }}>
            <select id="crypto-selector" onChange={(e) => setCrypto(e.target.value)} value={crypto}>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="ripple">Ripple</option>
                <option value="litecoin">Litecoin</option>
                <option value="cardano">Cardano</option>
            </select>
            <canvas ref={chartRef} />
        </div>
    );
};

export default CryptoChart;
