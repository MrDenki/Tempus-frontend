import Typography from '@mui/material/Typography';
import './style.scss'

const Title = ({ children, variant, className }) => (
  <Typography className={['title', className].join(' ')} color={'primary'} variant={variant} gutterBottom>
    {children}
  </Typography>
)

export default Title