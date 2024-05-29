const ctx = document.getElementById('barchart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Salary', 'Rent', 'Groceries', 'Utilities', 'Transportation', 'Other'],
        datasets: [{
            label: 'Monthly Expenses',
            data: [2500, 1200, 300, 200, 150, 500],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.1 // Smoothes the line
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount in USD'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Monthly Expenses',
                font: {
                    size: 18
                }
            },
            legend: {
                display: true,
                position: 'top'
            }
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 7,
                backgroundColor: 'rgba(54, 162, 235, 1)'
            }
        }
    }
});
