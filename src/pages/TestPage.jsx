import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import {useState} from "react"
import userService from '../api/userService'

function TestPage() {
    const router = useNavigate()
    const [users, setUsers] = useState()

    const click = async () => {
        // router('/test')
        const data = await userService.getUsers()
        setUsers(data)
    }

    return (
        <div>
            <Button onClick={() => click()}>asdasdas</Button>
          <h1>{users}</h1>
        </div>
    )
}

export default TestPage
