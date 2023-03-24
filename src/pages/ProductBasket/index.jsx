import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasketListItem from './BasketListItem'
import $ from './productBasket.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import { PRODUCT_LIST } from '@pages/Product/productData.js'
import classNames from 'classnames/bind'
import BgImg from '@assets/ic-logo-bg.png'

const cx = classNames.bind($)

const list = [
  {
    id: PRODUCT_LIST[0].id,
    title: PRODUCT_LIST[0].title,
    price: PRODUCT_LIST[0].price,
    img: PRODUCT_LIST[0].img,
  },
  {
    id: PRODUCT_LIST[1].id,
    title: PRODUCT_LIST[1].title,
    price: PRODUCT_LIST[1].price,
    img: PRODUCT_LIST[1].img,
  },
  {
    id: PRODUCT_LIST[2].id,
    title: PRODUCT_LIST[2].title,
    price: PRODUCT_LIST[2].price,
    img: PRODUCT_LIST[2].img,
  },
]

export default function ProductBasket() {
  const [checkedList, setCheckedList] = useState([])
  const [listData, setListData] = useState(list)
  const [listOrder, setListOrder] = useState([])
  const [listCount, setListCount] = useState(getListCount())

  function getListCount() {
    return listData.map((item) => {
      return {id: item.id, price: item.price, count: 1}
    })
  }

  useEffect(() => {
    setListCount(getListCount())
  }, [listData])
  
  const handleCountList = (id, count) => {
    const copy = [...listCount]
    copy.forEach((item) => {
      if (item.id === id) {
        item.count = count
      }
    })
    setListCount([...copy])
  }

  useEffect(() => {
    const price = listCount.map((item) => item.price * item.count).reduce((acc, cur) => acc + cur, 0)
    const delivery = price === 0 ? 0 : price >= 50000 ? 0 : 3000
    const totalPrice = price + delivery
  
    setListOrder([
      {
        id: 1,
        title: '총 상품 금액',
        price: price.toLocaleString('ko-KR'),
      },
      {
        id: 2,
        title: '배송비',
        price: delivery.toLocaleString('ko-KR'),
      },
      {
        id: 3,
        title: '총 결제 금액',
        price: totalPrice.toLocaleString('ko-KR'),
        total: true,
      },
    ])
  }, [listCount])

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  
  const handleCheckedItem = (id, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      setCheckedList(checkedList.filter((item) => item !== id))
    }
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allCheckedList = []
      listData.forEach((item) => allCheckedList.push(item.id.toString()))
      setCheckedList(allCheckedList)
    } else {
      setCheckedList([])
    }
  }

  const handleClickDelete = (e) => {
    const checkedId = e.currentTarget.parentNode.parentNode.parentNode.id
    setListData(
      listData.filter((item) => {
        return item.id.toString() !== checkedId
      })
    )
  }

  const handleCheckedDelete = () => {
    const listCopy = listData.filter((item) => {
      return !checkedList.includes(item.id.toString())
    })
    setListData(listCopy)
  }

  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HeaderTitle content="장바구니" />
          <IconButton kinds="close" onClick={goBack}/>
        </Flex>
      </Header>
      <div>
        <Flex width between marginTop marginBottom>
          <label className={$.all_check}>
            <input
              type="checkbox"
              onChange={handleAllChecked}
              checked={
                checkedList.length === 0
                  ? false
                  : checkedList.length === listData.length
                  ? true
                  : false
              }
            />
            <IconButton
              kinds={
                checkedList.length === 0
                  ? 'checkNone'
                  : checkedList.length === listData.length
                  ? 'check'
                  : 'checkNone'
              }
            />
            전체선택
          </label>
          <Button content="선택삭제" onClick={handleCheckedDelete} border />
        </Flex>
        <ul className={$.list_container}>
          {listData.length === 0 ? (
            // 리스트 없을 때
            <li className={$.empty_list}>
              <img src={BgImg} alt="빈 접시 이미지" />
            </li>
          ) : (
            listData.map((li) => {
              return (
                <BasketListItem key={li.id} data={li}
                  checkedList={checkedList}
                  handleClickDelete={handleClickDelete} 
                  handleCheckedItem={handleCheckedItem}
                  handleCountList={handleCountList}
                  />
              )
            })
          )}
        </ul>
      </div>
      <ul className={$.order_container}>
        {listOrder.map((li) => {
          const { id, title, price, total } = li
          return (
            <li key={id}>
              <Flex width between>
                <p className={cx('order_title', { total })}>{title}</p>
                <p className={cx('price', { total })}>{price}원</p>
              </Flex>
            </li>
          )
        })}
      </ul>
      <Button content="구매하기" />
    </Wrapper>
  )
}