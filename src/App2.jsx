import Alert from "./components/Alert";
import { useState } from "react"

const App2 = () => {
    const [pswd, SetPswd] = useState('');
    const [alert, SetAlert] = useState(false);
    const handleForm = (e) => {
        if (pswd === import.meta.env.VITE_PASSWORD) {
            localStorage.setItem('auth', true);

            SetAlert(false);
            window.location.reload();
        } else {
            SetAlert(true);
        }
        e.preventDefault();
    }
    return (
        <div className="flex items-center justify-centerw-[100vw] h-[100vh]">
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <Alert display={alert} />
                <div className="flex items-center justify-center">
                    <img style={{ width: 150, height: 150 }} className="rounded-full" src="/user.png" alt="" />
                </div>
                <h2 className="text-2xl font-bold my-5 text-gray-700 capitalize dark:text-white">Poultry Farm Monitoring System</h2>
                <form onSubmit={handleForm}>
                    <div className="mt-4 sm:grid-cols-2">
                        <div>
                            <input id="password" type="password" onChange={(e) => SetPswd(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Login</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default App2
