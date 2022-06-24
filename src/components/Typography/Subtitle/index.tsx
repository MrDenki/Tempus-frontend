import { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import './style.scss'

const Subtitle: FC<TypographyProps> = ({ children }) => (
  <Typography className='subtitle' variant="subtitle1" gutterBottom>
    {children}
  </Typography>
)

export default Subtitle