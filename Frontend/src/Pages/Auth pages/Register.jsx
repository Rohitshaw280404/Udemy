// import index.css
import './index.css'

 export function Register() {
    return (
        <div className="h-screen w-screen bg-amber-100 flex items-center justify-center">
            <div className="h-96 w-96 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <input type="text" placeholder="Username" className="mb-4 p-2 border border-gray-300 rounded" />
                <input type="email" placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded" />
                <input type="password" placeholder="Password" className="mb-4 p-2 border border-gray-300 rounded" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
            </div>
        </div> 

    )
}

