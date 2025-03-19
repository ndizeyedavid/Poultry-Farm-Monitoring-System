import Chart from "./Chart"
import PredictionChart from "./PredictionChart";
import Title from "./Title"

// Utility function to calculate predictions with timestamps
const calculatePrediction = (data, field) => {
    const lastFivePoints = data.slice(-5);
    const trend = lastFivePoints.reduce((acc, curr, idx) =>
        idx > 0 ? acc + (curr[field] - lastFivePoints[idx - 1][field]) : 0
        , 0) / 4;

    const lastValue = lastFivePoints[lastFivePoints.length - 1][field];
    const lastTimestamp = new Date(lastFivePoints[lastFivePoints.length - 1].added_date);

    return Array(3).fill().map((_, i) => {
        const predictionTime = new Date(lastTimestamp);
        predictionTime.setHours(predictionTime.getHours() + (i + 1));

        return {
            id: i + 1,
            timestamp: predictionTime.toISOString(),
            value: Math.round((lastValue + (trend * (i + 1))) * 100) / 100
        };
    });
};

function PredictionContainer({ data }) {
    // Transform timestamps for display
    const formatTimeLabel = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const hoursDiff = Math.round((date - now) / (1000 * 60 * 60));
        return hoursDiff <= 0 ? 'Now' : `${hoursDiff}h from now`;
    };

    const transformData = (rawData, field, predictions) => {
        const current = rawData.map(d => ({
            id: d.id,
            timestamp: formatTimeLabel(d.added_date),
            value: d[field]
        }));

        const predicted = predictions.map(p => ({
            ...p,
            timestamp: formatTimeLabel(p.added_date),
            predicted: true
        }));

        return [...current, ...predicted];
    };

    const tempPredictions = calculatePrediction(data, 'temperature');
    const humidPredictions = calculatePrediction(data, 'humidity');
    const gazPredictions = calculatePrediction(data, 'gaz');

    const tempData = transformData(data, 'temperature', tempPredictions);
    const humidData = transformData(data, 'humidity', humidPredictions);
    const gazData = transformData(data, 'gaz', gazPredictions);

    return (
        <div className="h-full bg-white artboard rounded-xl px-7">
            <Title />
            <h3 className="text-3xl font-bold ml-7">AI Prediction</h3>
            <div className="grid grid-cols-2 my-8 gap-7">
                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Temperature</h3>
                    <PredictionChart data={tempPredictions} value="Temperature" />
                </div>

                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Humidity</h3>
                    <PredictionChart data={humidPredictions} value="Humidity" />
                </div>

                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Air Quality</h3>
                    <PredictionChart data={gazPredictions} value="Quality" />
                </div>
            </div>
        </div>
    )
}

export default PredictionContainer
