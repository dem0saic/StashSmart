document.addEventListener('DOMContentLoaded', function() {
    // Select the theme toggler container
    const themeToggler = document.querySelector('.theme-toggler');

    // Select the icons within the theme toggler
    const sunIcon = document.querySelector('.theme-toggler .fa-sun');
    const moonIcon = document.querySelector('.theme-toggler .fa-moon');

    // Add click event listener to the theme toggler container
    themeToggler.addEventListener('click', () => {
        // Toggle the 'active' class on the icons with smooth transition
        sunIcon.classList.toggle('active');
        moonIcon.classList.toggle('active');

        // Toggle the 'dark-theme' class on the body element with smooth transition
        document.body.classList.toggle('dark-theme');
    });

    // Function to create the income vs. expense chart
    function createIncomeExpenseChart() {
        const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
        const incomeExpenseChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                        label: 'Income',
                        data: [1200, 1500, 1800, 1700, 1600, 1900, 2000],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
                    },
                    {
                        label: 'Expense',
                        data: [800, 700, 900, 850, 950, 1100, 1000],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Income vs. Expense',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.2)'
                        }
                    }
                }
            }
        });

        // Animate chart on hover
        ctx.canvas.addEventListener('mouseenter', function() {
            if (!incomeExpenseChart.animating) {
                incomeExpenseChart.update({ duration: 400, easing: 'easeOutBounce' });
                incomeExpenseChart.animating = true;
            }
        });

        // Reset animation state on mouse leave
        ctx.canvas.addEventListener('mouseleave', function() {
            incomeExpenseChart.animating = false;
            incomeExpenseChart.update({ duration: 0 });
        });
    }

    // Function to create the category distribution chart
    function createCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const categoryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sales', 'Office Expenses', 'Travel', 'Miscellaneous'],
                datasets: [{
                    label: 'Expense by Category',
                    data: [500, 250, 250, 100],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Monthly Expenses',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                let label = tooltipItem.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(tooltipItem.raw || 0); // Ensure raw data is used
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(200, 200, 200, 0.2)'
                        }
                    }
                }
            }
        });

        // Animate chart bars on hover
        ctx.canvas.addEventListener('mousemove', function(event) {
            const activeBars = categoryChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
            if (activeBars.length > 0) {
                categoryChart.setActiveElements([{ element: activeBars[0] }]);
                categoryChart.update();
            } else {
                categoryChart.setActiveElements([]);
                categoryChart.update();
            }
        });

        // Reset active elements on mouse leave
        ctx.canvas.addEventListener('mouseleave', function() {
            categoryChart.setActiveElements([]);
            categoryChart.update();
        });
    }

    // Call the functions to create the charts when the DOM is fully loaded
    createIncomeExpenseChart();
    createCategoryChart();
});

