import ApexCharts from "apexcharts"
import Title from "./components/Title"
import Monitoring from "./components/Monitoring"
import Control from "./components/Control"
import Footer from "./components/Footer"
import Chart from "./components/Chart"
import App2 from "./App2"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"
import PredictionContainer from "./components/PredictionContainer"
if (localStorage.getItem('auth') == null) {
  localStorage.setItem('auth', false);
}
const App1 = () => {

  // normal Data
  const [allData, setAllData] = useState([]);
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [co, setCo] = useState(0);
  const [ammonia, setAmmonia] = useState(0);

  // percentages
  const [tempPercent, setTempPercent] = useState(0);
  const [humidityPercent, setHumidityPercent] = useState(0);
  const [coPercent, setCoPercent] = useState(0);
  const [ammoniaPercent, setAmmoniaPercent] = useState(0);

  const [gra, setGra] = useState(0);
  let arr = [];
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(import.meta.env.VITE_BACKEND_URL + '/data')
      result.json()
        .then(data => {
          const new_index = data.length - 1;
          // console.log(data[new_index])
          setAllData(data);
          setTemp(data[new_index].temperature)

          if (arr.length > 500) {
            arr = arr.slice(300); // Remove the first element
          }

          arr.push(data[new_index].temperature);
          setGra(arr);

          setHumidity(data[new_index].humidity)
          setCo(data[new_index].gaz)
          // setAmmonia('2');   
        })
        .catch(err => console.log(err))


    }

    const averageData = async () => {
      const result = await fetch(import.meta.env.VITE_BACKEND_URL + '/average')
      result.json()
        .then(data => {
          const new_index = data.length - 1;
          setTempPercent(data[new_index].temperature)
          setHumidityPercent(data[new_index].humidity)
          setCoPercent(data[new_index].ammonia)
          // console.log(data[new_index.am)
          setAmmoniaPercent('2');
        })
        .catch(err => console.log(err))
    }

    // fetchData();
    setInterval(fetchData, 200);
    setInterval(averageData, 200);
  }, []);

  // tabs state control
  const [tab, SetTab] = useState('controls');

  const auth = localStorage.getItem('auth');


  return (
    <>

      <div className={localStorage.getItem('auth') == 'false' ? "flex items-center justify-center absolute top-0 w-full h-full z-20 bg-indigo-600 bg-opacity-25 backdrop-blur-md" : "hidden absolute top-0 w-full h-full z-20 bg-indigo-600 bg-opacity-25 backdrop-blur-md"}>
        <App2 />
      </div>

      <div className="flex flex-col items-center justify-center px-32 py-5 bg-slate-200">

        <div role="tablist" className="my-5 tabs tabs-boxed">
          {tab == 'controls' ?
            <>
              <a role="tab" className="tab tab-active">Controls</a>
              <a role="tab" className="tab" onClick={() => SetTab('graph')}>Graph</a>
              <a role="tab" className="tab" onClick={() => SetTab('prediction')}>Prediction</a>
            </>
            : tab == 'graph' ?
              <>
                <a role="tab" className="tab" onClick={() => SetTab('controls')}>Controls</a>
                <a role="tab" className="tab tab-active">Graph</a>
                <a role="tab" className="tab" onClick={() => SetTab('prediction')}>Prediction</a>
              </>
              :
              <>
                <a role="tab" className="tab" onClick={() => SetTab('controls')}>Controls</a>
                <a role="tab" className="tab" onClick={() => SetTab('graph')}>Graph</a>
                <a role="tab" className="tab tab-active">Prediction</a>
              </>
          }
        </div>


        {tab == 'controls' ?
          <div className="h-full bg-white artboard rounded-xl px-7">
            <Title />
            <h3 className="text-3xl font-bold ml-7">Monitoring</h3>
            <div className="flex flex-row my-8 gap-7">
              <Monitoring text="Temperature" value={temp + "°C"} percent={tempPercent} />
              <Monitoring text="Humidity" value={humidity + "%"} percent={humidityPercent} />
              <Monitoring text="Air Quality" value={co + "ppm"} percent={coPercent} />
              {/* <Monitoring text="Ammonia Level" value={ammonia + "ppm"} percent={ammoniaPercent} /> */}
            </div>
          </div>

          : tab == "graph" ?

            <div className="h-full bg-white artboard rounded-xl px-7">
              <Title />
              <h3 className="text-3xl font-bold ml-7">Temperatures (History)</h3>
              {/* <div className="flex flex-row my-8 gap-7"> */}
              <Chart tempData={gra} />
              {/* </div> */}
            </div>

            :

            <PredictionContainer data={allData} />

        }
      </div>

      <Footer />
    </>
  )
}

export default App1
