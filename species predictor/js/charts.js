/**
 * AI-Powered Endangered Species Population Predictor
 * Charts JavaScript Engine (Chart.js Implementations)
 */

let populationTrendChart = null;
let speciesComparisonChart = null;
let riskDistributionChart = null;
let environmentalImpactChart = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial chart rendering
    initCharts();

    // Listen for theme changes to dynamically update charts styling
    window.addEventListener('themeChanged', () => {
        destroyCharts();
        initCharts();
    });
});

/**
 * Helper to fetch colors based on current theme variables
 */
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        text: isDark ? '#94a3b8' : '#475569',
        border: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.8)',
        tooltipBg: isDark ? '#1e293b' : '#ffffff',
        tooltipText: isDark ? '#f8fafc' : '#0f172a',
        accentEmerald: '#10b981',
        accentTeal: '#0d9488',
        accentBlue: '#0284c7',
        accentCoral: '#f43f5e',
        accentAmber: '#d97706',
        accentYellow: '#eab308'
    };
}

/**
 * Initialize all Chart.js instances
 */
function initCharts() {
    const theme = getThemeColors();
    
    // Set global default styles
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = theme.text;
    Chart.defaults.plugins.tooltip.backgroundColor = theme.tooltipBg;
    Chart.defaults.plugins.tooltip.titleColor = theme.tooltipText;
    Chart.defaults.plugins.tooltip.bodyColor = theme.text;
    Chart.defaults.plugins.tooltip.borderColor = theme.border;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    
    renderPopulationTrend(theme);
    renderSpeciesComparison(theme);
    renderRiskDistribution(theme);
    renderEnvironmentalImpact(theme);
}

/**
 * Destroy existing instances to prevent overlays during re-renders
 */
function destroyCharts() {
    if (populationTrendChart) populationTrendChart.destroy();
    if (speciesComparisonChart) speciesComparisonChart.destroy();
    if (riskDistributionChart) riskDistributionChart.destroy();
    if (environmentalImpactChart) environmentalImpactChart.destroy();
}

/**
 * 1. Population Trend Line Chart
 */
function renderPopulationTrend(theme) {
    const ctx = document.getElementById('populationTrendChart');
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const data = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024 (Current)', '2025 (Predict)', '2029 (Predict)'],
        datasets: [{
            label: 'Estimated Bengal Tiger Population',
            data: [3150, 3280, 3400, 3350, 3520, 3680, 3850, 3960, 4320],
            borderColor: theme.accentEmerald,
            borderWidth: 3,
            fill: true,
            backgroundColor: gradient,
            tension: 0.4,
            pointBackgroundColor: theme.accentEmerald,
            pointBorderColor: '#fff',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: theme.accentEmerald
        }]
    };

    populationTrendChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: theme.border
                    },
                    ticks: {
                        color: theme.text
                    }
                },
                y: {
                    grid: {
                        color: theme.border
                    },
                    ticks: {
                        color: theme.text
                    }
                }
            }
        }
    });
}

/**
 * 2. Species Comparison Bar Chart
 */
function renderSpeciesComparison(theme) {
    const ctx = document.getElementById('speciesComparisonChart');
    if (!ctx) return;

    const data = {
        labels: ['Bengal Tiger', 'Asiatic Lion', 'Black Rhino', 'Snow Leopard', 'Red Panda', 'African Elephant'],
        datasets: [
            {
                label: 'Current Population',
                backgroundColor: theme.accentTeal,
                data: [3850, 674, 5630, 4000, 10000, 415000],
                borderRadius: 6,
            },
            {
                label: 'Predicted Population (5yr)',
                backgroundColor: theme.accentBlue,
                data: [4320, 710, 5210, 3850, 9100, 395000],
                borderRadius: 6,
            }
        ]
    };

    speciesComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        color: theme.text
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: theme.text
                    }
                },
                y: {
                    type: 'logarithmic', // Use log scale due to huge difference in population figures ( rhino/lion vs elephant)
                    grid: {
                        color: theme.border
                    },
                    ticks: {
                        color: theme.text,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

/**
 * 3. Risk Distribution Pie Chart
 */
function renderRiskDistribution(theme) {
    const ctx = document.getElementById('riskDistributionChart');
    if (!ctx) return;

    const data = {
        labels: ['Safe', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Near Extinction'],
        datasets: [{
            data: [35, 28, 18, 12, 7],
            backgroundColor: [
                theme.accentEmerald,
                theme.accentYellow,
                theme.accentAmber,
                theme.accentCoral,
                '#64748b'
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    riskDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        color: theme.text,
                        padding: 15
                    }
                }
            },
            cutout: '65%'
        }
    });
}

/**
 * 4. Environmental Impact Radar Chart
 */
function renderEnvironmentalImpact(theme) {
    const ctx = document.getElementById('environmentalImpactChart');
    if (!ctx) return;

    const data = {
        labels: ['Deforestation Rate', 'Poaching Level', 'Human Population Density', 'Climate Change Index', 'Pollution Level'],
        datasets: [
            {
                label: 'Tiger Habitat Threats',
                backgroundColor: 'rgba(244, 63, 94, 0.2)',
                borderColor: theme.accentCoral,
                pointBackgroundColor: theme.accentCoral,
                data: [65, 80, 50, 45, 30]
            },
            {
                label: 'Red Panda Habitat Threats',
                backgroundColor: 'rgba(2, 132, 199, 0.2)',
                borderColor: theme.accentBlue,
                pointBackgroundColor: theme.accentBlue,
                data: [85, 20, 40, 70, 45]
            }
        ]
    };

    environmentalImpactChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        color: theme.text
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: theme.border
                    },
                    angleLines: {
                        color: theme.border
                    },
                    pointLabels: {
                        color: theme.text,
                        font: {
                            size: 10
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: theme.text
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}
