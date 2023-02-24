import React, { useEffect, useState, useCallback, useRef } from 'react'
import $ from './countBox.module.scss'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function CountBox({ value, name, onChange, handleSetNumber, marginBottomNone }) {
  const [minusColor, setMinusColor] = useState('minusGray')
  const inputRef = useRef(null)

  useEffect(() => {
    if (value > 1) {
      setMinusColor('minus')
    } else {
      setMinusColor('minusGray')
    }
  }, [value])

  const handleInputCheck = useCallback((e) => {
    e.preventDefault()
    if (inputRef.current.value === 0) {
      handleSetNumber(1)
    }
    inputRef.current.blur()
  }, [])

  const handleClickButton = useCallback((sign) => {
    const num = value
    if (sign === 'minus') {
      Number(num - 1) <= 0 ? handleSetNumber(0) : handleSetNumber(Number(num - 1))
    } else if (sign === 'plus') {
      handleSetNumber(Number(num + 1))
    }
  }, [value])

  return (
    <div className={cx('count_box', {marginBottomNone})}>
      <Flex width between>
        <button onClick={() => handleClickButton('minus')}>
          <IconButton kinds={minusColor} />
        </button>
        <form onSubmit={handleInputCheck}>
          <input
            type="number"
            className={$.count}
            ref={inputRef}
            {...{name, value, onChange}}
            // value={value}
          />
        </form>
        <button onClick={() => handleClickButton('plus')}>
          <IconButton kinds={'plus'} />
        </button>
      </Flex>
    </div>
  )
}
