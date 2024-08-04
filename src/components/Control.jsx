
const Control = ({ text }) => {
    return (
        <div className="card bg-base-100 border-2 w-96 shadow-xl hover:scale-[1.05] hover:shadow-2xl cursor-default transition-all">
            <div className="card-body">
                <h2 className="card-title justify-center text-2xl">{text}</h2>
                <div className="card-actions justify-center">
                    <input type="checkbox" className="toggle toggle-success toggle-lg" />
                </div>
            </div>
        </div>
    )
}

export default Control
