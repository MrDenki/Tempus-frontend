import { FC } from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import './style.scss'

const Title: FC<TypographyProps> = ({ children, variant, className }) => (
  <Typography className={['title', className].join(' ')} variant={variant} gutterBottom>
    {children}
  </Typography>
)

export default Title