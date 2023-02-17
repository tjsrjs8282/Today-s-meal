import React, { useEffect, useState } from 'react'
import $ from './countBox.module.scss'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import { useRef } from 'react'
import { useCallback } from 'react'

export default function CountBox() {
  const [foodCount, setFoodCount] = useState(1)
  const [minusColor, setMinusColor] = useState('minusGray')
  const inputRef = useRef(null)

  useEffect(() => {
    if (foodCount > 1) {
      setMinusColor('minus')
    } else {
      setMinusColor('minusGray')
    }
  }, [foodCount])

  const handleInputCheck = useCallback((e) => {
    e.preventDefault()
    if (inputRef.current.value === '') {
      setFoodCount(1)
    }
    inputRef.current.blur()
  }, [])

  const handleClickButton = useCallback((sign) => {
    if (sign === 'minus') {
      setFoodCount((prevFoodCount) => {
        return prevFoodCount === 1 ? prevFoodCount : prevFoodCount - 1
      })
    } else if (sign === 'plus') {
      setFoodCount((prevFoodCount) => prevFoodCount + 1)
    }
  }, [])

  const handleChangeInput = useCallback((e) => {
    setFoodCount(Number(e.target.value))
  }, [])

  return (
    <div className={$.count_box}>
      <Flex width between>
        <button onClick={() => handleClickButton('minus')}>
          <IconButton kinds={minusColor} />
        </button>
        <form onSubmit={handleInputCheck}>
          <input
            type="number"
            className={$.count}
            value={foodCount || ''}
            ref={inputRef}
            onChange={handleChangeInput}
          />
        </form>
        <button onClick={() => handleClickButton('plus')}>
          <IconButton kinds={'plus'} />
        </button>
      </Flex>
    </div>
  )
}
