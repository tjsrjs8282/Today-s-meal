import React, { useEffect, useRef, useState } from 'react'
import $ from './basketListItem.module.scss'
import CountBox from '@components/CountBox'
import CheckBox from '../CheckBox'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'

export default function BasketListItem({
  data,
  checkedList,
  handleCheckedItem,
  onClickDeleteModal,
  handleCountList,
}) {
  const { id, title, price, img } = data
  const [count, setCount] = useState(1)
  const [itemPrice, setItemPrice] = useState(price)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    }
    setItemPrice(price * count)
    handleCountList(id, count)
  }, [count, itemPrice])

  const handleCountCalculation = (value) => {
    setCount(value)
  }

  const handleCountChange = (e) => {
    setCount(e.target.value)
  }

  return (
    <li className={$.listItem} id={id}>
      <CheckBox
        id={id}
        onChecked={handleCheckedItem}
        checked={checkedList.includes(id.toString()) ? true : false}
        icon={checkedList.includes(id.toString()) ? 'check' : 'checkNone'}
      />
      <div className={$.product_container}>
        <Flex start>
          <div className={$.image_box}>
            <img src={img} alt={title} />
          </div>
          <h3>{title}</h3>
        </Flex>
        <Flex between>
          <div className={$.count_container} id={id}>
            <CountBox
              value={count}
              handleCountCalculation={handleCountCalculation}
              marginBottomNone
              smallFont
              onChange={handleCountChange}
            />
          </div>
          <p className={$.price}>{itemPrice.toLocaleString('ko-KR')}원</p>
        </Flex>
        <div className={$.close_button}>
          <IconButton kinds="close" onClick={onClickDeleteModal} />
        </div>
      </div>
    </li>
  )
}
