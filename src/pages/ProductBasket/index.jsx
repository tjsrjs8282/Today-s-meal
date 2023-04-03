import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BasketListItem from './BasketListItem'
import $ from './productBasket.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import Modal from '@components/Modal'
import classNames from 'classnames/bind'
import BgImg from '@assets/ic-logo-bg.png'
import { localStorageService } from '@utils/localStorage.service'
const cx = classNames.bind($)

export default function ProductBasket() {
  const [checkedList, setCheckedList] = useState([])
  const [cartList, setCartList] = useState([])
  const [cartDelete, setCartDelete] = useState([])
  const [myPoint, setMyPoint] = useState(0)
  const [buyModal, setBuyModal] = useState(false)
  const [checkModal, setCheckModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [totalPrice, setTotalPrice] = useState([])
  const sessionMyPoint = localStorageService().get('MY_POINT')
  const price = cartList.map((item) => item.price * item.count).reduce((acc, cur) => acc + cur, 0)
  const delivery = price === 0 ? 0 : price >= 50000 ? 0 : 3000
  const priceTotal = price + delivery
  const reservePoint = Math.ceil(price * 0.02)

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const handleCountList = (id, count) => {
    const copy = [...cartList]
    copy.forEach((item) => {
      if (item.id === id) {
        item.count = count
      }
    })
    setCartList([...copy])
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
      cartList.forEach((item) => allCheckedList.push(item.id.toString()))
      setCheckedList(allCheckedList)
    } else {
      setCheckedList([])
    }
  }

  const onClickDeleteModal = async (e) => {
    const checkedId = await e.currentTarget.parentNode.parentNode.parentNode.id
    const cartCheckFilter = await cartList.filter((item) => {
      return item.id.toString() === checkedId
    })
    const cartDeleteFilter = await cartList.filter((item) => {
      return item.id.toString() !== checkedId
    })
    setCheckedList([])
    setCartDelete(cartDeleteFilter)
    setModalTitle(`삭제하기`)
    setModalContent(`${cartCheckFilter[0].title} 를(을)
     삭제 하시겠습니까?`)
    setModal(!modal)
  }

  const handleClickDelete = () => {
    setCheckedList([])
    setCartList(cartDelete)
    localStorageService().set('CART', cartDelete)
    setModal(false)
  }

  const handleCheckedDelete = async () => {
    const listCopy = await cartList.filter((item) => {
      return !checkedList.includes(item.id.toString())
    })
    setCheckedList([])
    setCartList(listCopy)
    localStorageService().set('CART', listCopy)
    setCheckModal(false)
  }

  const onClickCheckedModal = () => {
    if (checkedList.length !== 0) {
      setModalTitle(`삭제하기`)
      setModalContent(`선택하신 상품을 삭제 하시겠습니까?`)
    } else {
      setModalTitle(`삭제하기`)
      setModalContent(`선택하신 상품이 없습니다.`)
    }
    setCheckModal(!modal)
  }

  const modalOnClose = () => {
    setModal(false)
    setCheckModal(false)
    setBuyModal(false)
  }

  const onClickModalHandler = (name, id) => {
    setModalTitle(`구매하기`)
    setModalContent(`선택하신 상품들을
     구매 하시겠습니까?`)
    setBuyModal(!modal)
  }

  const onClickBuyHandler = () => {
    if (cartList.length === 0) {
      alert('장바구니가 비어있습니다!')
      setBuyModal(false)
      return
    }
    if (sessionMyPoint - priceTotal > 0) {
      let buyPoint = sessionMyPoint - priceTotal + reservePoint
      localStorageService().set('MY_POINT', buyPoint)
      localStorageService().remove('CART')
      setMyPoint(buyPoint.toLocaleString('ko-KR'))
      setCartList([])
      alert('구매가 완료되었습니다!')
    } else {
      alert('포인트가 부족합니다.')
    }
    setBuyModal(false)
  }

  useEffect(() => {
    setTotalPrice([
      {
        id: 1,
        title: '총 상품 금액',
        price: price.toLocaleString('ko-KR'),
      },
      {
        id: 2,
        title: '적립금',
        price: reservePoint.toLocaleString('ko-KR'),
      },
      {
        id: 3,
        title: '배송비',
        price: delivery.toLocaleString('ko-KR'),
      },
      {
        id: 4,
        title: '총 결제 금액',
        price: priceTotal.toLocaleString('ko-KR'),
        total: true,
      },
    ])
  }, [cartList])

  function getCartList() {
    const sessionCart = localStorageService().get('CART')
    const sessionCheck = sessionCart
      ? sessionCart.map((item) => {
          return { ...item, count: 1 }
        })
      : []
    setCartList(sessionCheck)
  }

  function getPoint() {
    const getPoint = sessionMyPoint ? sessionMyPoint : 0
    setMyPoint(getPoint.toLocaleString('ko-KR'))
  }

  useEffect(() => {
    getCartList()
    getPoint()
  }, [])

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
      {checkModal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={handleCheckedDelete}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      {buyModal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={onClickBuyHandler}
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
          <Button content="선택삭제" onClick={onClickCheckedModal} border />
        </Flex>
        <ul className={$.list_container}>
          {cartList.length === 0 ? (
            // 리스트 없을 때
            <li className={$.empty_list}>
              <img src={BgImg} alt="빈 접시 이미지" />
            </li>
          ) : (
            cartList.map((li) => {
              return (
                <BasketListItem
                  key={li.id}
                  data={li}
                  checkedList={checkedList}
                  onClickDeleteModal={onClickDeleteModal}
                  handleCheckedItem={handleCheckedItem}
                  handleCountList={handleCountList}
                />
              )
            })
          )}
        </ul>
      </div>
      <ul className={$.order_container}>
        {totalPrice.map((li) => {
          const { id, title, price, total } = li
          return (
            <li key={id}>
              <Flex width between>
                <p className={cx('order_title', { total })}>{title}</p>
                <p className={cx('price', { total })}>{price} 원</p>
              </Flex>
            </li>
          )
        })}
      </ul>
      <ul className={$.order_container}>
        <li>
          <Flex width between>
            <p className={cx('order_title', 'total')}>나의 포인트</p>
            <p className={cx('price', 'total')}>{myPoint} P</p>
          </Flex>
        </li>
      </ul>
      <Button content="구매하기" onClick={onClickModalHandler} container />
    </Wrapper>
  )
}
