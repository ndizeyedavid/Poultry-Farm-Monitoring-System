import Chart from "./Chart"
import PredictionChart from "./PredictionChart";
import Title from "./Title"

// Utility function to calculate predictions
const calculatePrediction = (data, field) => {
    const lastFivePoints = data.slice(-5);
    const trend = lastFivePoints.reduce((acc, curr, idx) =>
        idx > 0 ? acc + (curr[field] - lastFivePoints[idx - 1][field]) : 0
        , 0) / 4;

    const lastValue = lastFivePoints[lastFivePoints.length - 1][field];
    return Array(3).fill().map((_, i) => ({
        id: data.length + i + 1,
        [field]: Math.round((lastValue + (trend * (i + 1))) * 100) / 100
    }));
};

function PredictionContainer({ data }) {
    const predictTemp = calculatePrediction(data, 'temperature');
    const predictHumid = calculatePrediction(data, 'humidity');
    const predictGaz = calculatePrediction(data, 'gaz');

    const tempData = [...data.map(d => ({ id: d.id, value: d.temperature })),
    ...predictTemp.map(d => ({ id: d.id, value: d.temperature, predicted: true }))];

    const humidData = [...data.map(d => ({ id: d.id, value: d.humidity })),
    ...predictHumid.map(d => ({ id: d.id, value: d.humidity, predicted: true }))];

    const gazData = [...data.map(d => ({ id: d.id, value: d.gaz })),
    ...predictGaz.map(d => ({ id: d.id, value: d.gaz, predicted: true }))];

    return (
        <div className="h-full bg-white artboard rounded-xl px-7">
            <Title />
            <h3 className="text-3xl font-bold ml-7">AI Prediction</h3>
            <div className="grid grid-cols-2 my-8 gap-7">
                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Temperature</h3>
                    <PredictionChart data={tempData} predictionEnabled={true} />
                </div>

                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Humidity</h3>
                    <PredictionChart data={humidData} predictionEnabled={true} />
                </div>

                <div className="flex flex-col gap-2 p-2 rounded-md shadow-md">
                    <h3 className="text-2xl font-medium">Air Quality</h3>
                    <PredictionChart data={gazData} predictionEnabled={true} />
                </div>
            </div>
        </div>
    )
}

export default PredictionContainer
