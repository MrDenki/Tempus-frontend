import { FC } from 'react';
import './style.scss'

const TitleSection: FC = ({ children }) => (
  <span className='title_section'>
    {children}
  </span>
)

export default TitleSection