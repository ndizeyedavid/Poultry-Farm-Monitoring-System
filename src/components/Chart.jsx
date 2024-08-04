import { Line } from "react-chartjs-2"
import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const Chart = ({ tempData }) => {
    // console.log(tempData);
    const data = {
        labels: [...tempData],
        datasets: [{
            data: tempData,
            borderColor: '#4be59c',
            backgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            tension: 0.5
        }]
    };
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    // stepSize: 20,
                    callback: (value) => ''
                }
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    callback: (value) => value + '°C'
                }
            }
        }
    };

    return (
        <>
            <div className='chart w-[100%]'>
                <Line data={data} options={options}></Line>
            </div>
        </>
    )
}

export default Chart
