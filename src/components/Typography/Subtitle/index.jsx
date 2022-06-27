import Typography from '@mui/material/Typography';
import './style.scss'

const Subtitle = ({ children }) => (
  <Typography className='subtitle' variant="subtitle1" gutterBottom>
    {children}
  </Typography>
)

export default Subtitle