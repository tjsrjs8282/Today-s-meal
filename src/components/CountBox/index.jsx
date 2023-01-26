import React, { useState } from 'react';
import $ from './countBox.module.scss'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton';

const CountBox = () => {
  const [foodCount, setFoodCount] = useState(1)
  const [minusColor, setMinusColor] = useState('minusGray')

  const handleClickButton = (sign) => {
    if (sign === 'minus') {      
      setFoodCount((prevFoodCount) => {
        return prevFoodCount === 1 ? prevFoodCount : prevFoodCount - 1
      })
    } else if (sign === 'plus') {
      setFoodCount((prevFoodCount) => prevFoodCount + 1)
    } 
  }

  return (
    <div className={$.count_box}>
      <Flex width between>
        <button onClick={() => handleClickButton('minus')}>
          <IconButton kinds={minusColor} />
        </button>
        <div className={$.count}>{foodCount}</div>        
        <button onClick={() => handleClickButton('plus')}>
          <IconButton kinds={'plus'} />
        </button>
      </Flex>
    </div> 
  );
};

export default CountBox;