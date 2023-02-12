import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import InputSearch from '@components/InputSearch'
import FoodSearchListItem from './FoodSearchListItem'
import { fatsecretInstance } from '@api/axiosInstance'
export default function FoodSearch() {
  const [value, onChange] = useState(new Date())
  const [searchFood, setSearchFood] = useState('')
  const [isSearchData, setIsSearchData] = useState(true)
  const [foodList, setFoodList] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleInputChange = useCallback(
    (e) => {
      setSearchFood(e.target.value)
    },
    [searchFood]
  )

  const handleResetClick = () => {
    setSearchFood('')
    inputRef.current.focus()
  }

  const handleItemClick = (id) => {
    navigate(`../search/${id}`)
  }

  const goBack = () => {
    navigate('../today')
  }

  const randomFootList = [
    'Beans',
    'Milk',
    'Breads',
    'Fast',
    'Fruit',
    'Meat',
    'Salads',
    'Pasta',
    'Desserts',
    'Snacks',
  ]

  const search = (e) => {
    if (e.key === 'Enter') {
      let keyword = e.target.value
    }
  }

  function getFatsecret(keyword) {
    fatsecretInstance
      .get(
        `?method=foods.search&format=json&search_expression=${keyword}&page_number=0&max_results=10`
      )
      .then((res) => setFoodList(res.data.foods.food))
      .catch((err) => console.log(err))
    // fatsecretInstance.then((res) => console.log(res)).catch((err) => console.log(err))
  }

  console.log(foodList)

  useEffect(() => {
    let keyword = randomFootList[~~(Math.random() * 10)]
    getFatsecret(keyword)
  }, [])

  if (!isSearchData) {
    return (
      <Wrapper colorGray>
        <Header>
          <Flex column start width>
            <Flex between>
              <HeaderTitle content="아침식사" dates={value} />
              <IconButton kinds="close" onClick={goBack} />
            </Flex>
            <InputSearch
              type="text"
              name="foodSearch"
              value={searchFood}
              inputRef={inputRef}
              placeholder="먹은 음식을 검색해 주세요."
              onChange={handleInputChange}
              onClick={handleResetClick}
              onKeyPress={(e) => search(e)}
            />
          </Flex>
        </Header>
        <div className={$.empty_box}>
          <img src={logoBg} alt="빈접시" />
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper colorGray>
      <Header>
        <Flex column start width>
          <Flex between width>
            <HeaderTitle content="아침식사" dates={value} />
            <IconButton kinds="close" onClick={goBack} />
          </Flex>
          <InputSearch
            type="text"
            name="foodSearch"
            value={searchFood}
            inputRef={inputRef}
            placeholder="먹은 음식을 검색해 주세요."
            onChange={handleInputChange}
            onClick={handleResetClick}
            onKeyPress={(e) => search(e)}
          />
        </Flex>
      </Header>
      <div className={$.food_list}>
        {foodList.map((foodData) => {
          const { food_id } = foodData
          console.log(food_id)
          return (
            <FoodSearchListItem
              key={food_id}
              foodData={foodData}
              onClick={() => handleItemClick(food_id)}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}
