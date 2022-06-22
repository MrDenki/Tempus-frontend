import {useState} from 'react'
import { Button } from 'primereact/button';
import AppRouter from "./components/AppRouter";


function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <AppRouter />
        </div>
    )
}

export default App
