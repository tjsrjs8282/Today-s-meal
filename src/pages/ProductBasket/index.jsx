import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './productBasket.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import CountBox from '@components/CountBox'
import CheckBox from './CheckBox'
import Modal from '@components/Modal'
import classNames from 'classnames/bind'
import BgImg from '@assets/ic-logo-bg.png'
import { localStorageService } from '@utils/localStorage.service'
const cx = classNames.bind($)

export default function ProductBasket() {
  const [checkedList, setCheckedList] = useState([])
  const [cartList, setCartList] = useState([])
  const [cartDelete, setCartDelete] = useState([])
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [listOrder, setListOrder] = useState([])
  const [listCount, setListCount] = useState(getListCount())
  const priceTotal =
    cartList.length !== 0 ? cartList.map((data) => data.price).reduce((acc, cur) => acc + cur) : 0
  const deliPrice = priceTotal > 50000 || cartList.length === 0 ? 0 : 3000

  const TOTAL_PRICE = [
    {
      id: 1,
      title: '총 상품 금액',
      price: priceTotal.toLocaleString('ko-KR'),
    },
    {
      id: 2,
      title: '배송비',
      price: deliPrice.toLocaleString('ko-KR'),
    },
    {
      id: 3,
      title: '총 결제 금액',
      price: (priceTotal + deliPrice).toLocaleString('ko-KR'),
      total: true,
    },
  ]

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  function getListCount() {
    return cartList.map((item) => {
      return { id: item.id, price: item.price, count: 1 }
    })
  }

  useEffect(() => {
    setListCount(getListCount())
  }, [cartList])

  const handleCountList = (id, count) => {
    const copy = [...listCount]
    copy.forEach((item) => {
      if (item.id === id) {
        item.count = count
      }
    })
    setListCount([...copy])
  }

  const handleCheckedItem = (id, isChecked) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, id])
    } else {
      setCheckedList(checkedList.filter((item) => item !== id))
    }
    console.log(checkedList)
  }

  const handleAllChecked = (e) => {
    if (e.target.checked) {
      const allCheckedList = []
      cartList.forEach((item) => allCheckedList.push(item.id.toString()))

      setCheckedList(allCheckedList)
    } else {
      setCheckedList([])
    }
    console.log('handleAllChekecd', checkedList)
  }

  const onClickDeleteHandler = async (e) => {
    const checkedId = await e.currentTarget.parentNode.parentNode.parentNode.id
    const cartCheckFilter = await cartList.filter((item) => {
      return item.id.toString() === checkedId
    })
    const cartDeleteFilter = await cartList.filter((item) => {
      return item.id.toString() !== checkedId
    })
    setCartDelete(cartDeleteFilter)
    setModalTitle(`삭제하기`)
    setModalContent(`${cartCheckFilter[0].title} 를(을)
     삭제 하시겠습니까?`)
    setModal(!modal)
  }

  const handleClickDelete = () => {
    setCartList(cartDelete)
    localStorageService().set('CART', cartDelete)
    setModal(false)
  }

  const handleCheckedDelete = async () => {
    const listCopy = await cartList.filter((item) => {
      return !checkedList.includes(item.id.toString())
    })
    setCartList(listCopy)
    localStorageService().set('CART', listCopy)
  }

  const modalOnClose = () => {
    setModal(false)
  }

  const onClickModalHandler = (name, id) => {
    setModalTitle(`구매하기`)
    setModalContent(`${productList[0].title} 를(을)
     구매 하시겠습니까?`)

    setModal(!modal)
  }

  function getCartList() {
    const sessionCart = localStorageService().get('CART')
    const sessionCheck = sessionCart ? sessionCart : []
    setCartList(sessionCheck)
  }

  useEffect(() => {
    getCartList()
  }, [])
  console.log(cartList)

  return (
    <Wrapper colorGray>
      {modal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={handleClickDelete}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      <Header>
        <Flex width between>
          <HeaderTitle content="장바구니" />
          <IconButton kinds="close" onClick={goBack} />
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
                  : checkedList.length === cartList.length
                  ? true
                  : false
              }
            />
            <IconButton
              kinds={
                checkedList.length === 0
                  ? 'checkNone'
                  : checkedList.length === cartList.length
                  ? 'check'
                  : 'checkNone'
              }
            />
            전체선택
          </label>
          <Button content="선택삭제" onClick={handleCheckedDelete} border />
        </Flex>
        <ul className={$.list_container}>
          {cartList.length === 0 ? (
            // 리스트 없을 때
            <li className={$.empty_list}>
              <img src={BgImg} alt="빈 접시 이미지" />
            </li>
          ) : (
            cartList.map((li) => {
              const { id, title, price, img } = li
              return (
                <li key={id} id={id}>
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
                      <div className={$.count_container}>
                        <CountBox value={1} marginBottomNone smallFont onChange={() => {}} />
                      </div>
                      <p className={$.price}>{price}원</p>
                    </Flex>
                    <div className={$.close_button}>
                      <IconButton kinds="close" onClick={onClickDeleteHandler} />
                    </div>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      </div>
      <ul className={$.order_container}>
        {TOTAL_PRICE.map((li) => {
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
      <Button content="구매하기" onClick={onClickModalHandler} />
    </Wrapper>
  )
}
