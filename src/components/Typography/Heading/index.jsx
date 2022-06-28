import Typography from '@mui/material/Typography';
import './style.scss'

const Heading = ({ children }) => (
  <Typography className='heading' color="secondary" variant="h3" gutterBottom>
    {children}
  </Typography>
)

export default Heading