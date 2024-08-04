import ApexCharts from "apexcharts"
import Title from "./components/Title"
import Monitoring from "./components/Monitoring"
import Control from "./components/Control"
import Footer from "./components/Footer"
import Chart from "./components/Chart"
import App2 from "./App2"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"
if (localStorage.getItem('auth') == null) {
  localStorage.setItem('auth', false);
}
const App1 = () => {

  // normal Data
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
      const result = await fetch('http://localhost:8081/data')
      result.json()
        .then(data => {
          const new_index = data.length - 1;
          setTemp(data[new_index].value1)

          if (arr.length > 500) {
            arr = arr.slice(300); // Remove the first element
          }

          arr.push(data[new_index].value1);
          setGra(arr);

          setHumidity(data[new_index].value2)
          setCo(data[new_index].value3)
          setAmmonia('2');
        })
        .catch(err => console.log(err))


    }

    const averageData = async () => {
      const result = await fetch('http://localhost:8081/average')
      result.json()
        .then(data => {
          const new_index = data.length - 1;
          setTempPercent(data[new_index].value1)
          setHumidityPercent(data[new_index].value2)
          setCoPercent(data[new_index].value3)
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

      <div className="bg-slate-200 flex items-center flex-col py-5 px-32 justify-center">

        <div role="tablist" className="tabs tabs-boxed my-5">
          {tab == 'controls' ? <><a role="tab" className="tab tab-active">Controls</a><a role="tab" className="tab" onClick={() => SetTab('graph')}>Graph</a></> : <><a role="tab" className="tab" onClick={() => SetTab('controls')}>Controls</a><a role="tab" className="tab tab-active">Graph</a></>}
        </div>


        {tab == 'controls' ?
          <div className="artboard bg-white rounded-xl px-7 h-full">
            <Title />
            <h3 className="text-3xl ml-7 font-bold">Monitoring</h3>
            <div className="flex flex-row gap-7 my-8">
              <Monitoring text="Temperature" value={temp + "°C"} percent={tempPercent} />
              <Monitoring text="Humidity" value={humidity + "%"} percent={humidityPercent} />
              <Monitoring text="CO2 Level" value={co + "ppm"} percent={coPercent} />
              <Monitoring text="Ammonia Level" value={ammonia + "ppm"} percent={ammoniaPercent} />
            </div>

            <h3 className="text-3xl ml-7 font-bold">Controls</h3>
            <div className="flex flex-row gap-7 my-8">
              <Control text="Fan Control" />
              <Control text="Buzzer Control" />
              <Control text="LED Control" />
            </div>


          </div>

          :

          <div className="artboard bg-white rounded-xl px-7 h-full">
            <Title />
            <h3 className="text-3xl ml-7 font-bold">Temperatures (History)</h3>
            {/* <div className="flex flex-row gap-7 my-8"> */}
            <Chart tempData={gra} />
            {/* </div> */}


          </div>

        }
      </div>

      <Footer />
    </>
  )
}

export default App1
