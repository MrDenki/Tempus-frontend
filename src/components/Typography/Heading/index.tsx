import { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import './style.scss'

const Heading: FC<TypographyProps> = ({ children }) => (
  <Typography className='heading' variant="h3" gutterBottom>
    {children}
  </Typography>
)

export default Heading