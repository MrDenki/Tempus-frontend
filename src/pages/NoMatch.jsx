import { Link } from 'react-router-dom'
import { Heading } from "../components/Typography";
import Button from "@/components/UI/Button";

const NoMatch = () => (
  <div style={{ textAlign: 'center' }}>
    <Heading>Nothing to see here!</Heading>
    <Link to="/" style={{marginTop: 10}}>
      <Button>Go to the home page</Button>
    </Link>
  </div>
)

export default NoMatch