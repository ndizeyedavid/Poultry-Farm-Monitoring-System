
const Monitoring = ({ text, value, percent }) => {
    return (
        <>
            <label className="swap card bg-base-100 border-2 w-96 shadow-xl hover:scale-105 hover:shadow-2xl cursor-pointer transition-all">
                <input type="checkbox" defaultChecked />
                <div className="swap-on card-body">
                    <h2 className="card-title justify-center text-4xl">{value}</h2>
                    <p className="text-center text-gray-500 text-lg">{text}</p>
                </div>
                <div className="swap-off flex items-center justify-center">
                    <div className="radial-progress" style={{ "--value": Number(percent) }} role="progressbar">{percent} %</div>
                </div>

            </label>
        </>
    )
}

export default Monitoring
