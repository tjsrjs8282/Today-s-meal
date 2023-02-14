import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from './foodDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import CountBox from '@components/CountBox'
import Button from '@components/Button'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import FoodDetailInfo from './FoodDetailInfo'
import { FOOD_DETAIL_INFO } from './FoodDetailInfo/constants'
import { fatsecretInstance } from '@api/axiosInstance'

import kcalIcon from '@assets/ic-kcal-normal.png'
import carbohydrateIcon from '@assets/ic-carbohydrate-normal.png'
import proteinIcon from '@assets/ic-protein-normal.png'
import fatIcon from '@assets/ic-fat-normal.png'

const FoodDetail = () => {
  const navigate = useNavigate()
  const [foodList, setFoodList] = useState([])
  const [foodServingData, setFoodServingData] = useState([])
  const [foodServingList, setFoodServingList] = useState({})
  const [foodMeasurement, setFoodMeasurement] = useState('')
  const [foodServingId, setFoodServingId] = useState(0)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const handleClickAdd = () => {
    console.log('handleClickAdd')
  }

  const goBack = () => {
    navigate('../search')
  }

  async function getFatsecret() {
    setLoading(true)
    let res = await fatsecretInstance.get(`?method=food.get.v2&format=json&food_id=${id}`)
    if (res.err) {
      console.log(err)
    }
    const servingData = res.data.food.servings.serving
    let arrCheck = Array.isArray(servingData) ? servingData : [servingData]
    setFoodList(res.data.food)
    setFoodServingData(arrCheck)
    setFoodMeasurement(arrCheck[0].measurement_description)
    setFoodServingList({
      calories: arrCheck[0].calories,
      carbohydrate: arrCheck[0].calories,
      protein: arrCheck[0].protein,
      fat: arrCheck[0].fat,
    })
    setFoodServingId(arrCheck[0].calories)

    setLoading(false)
  }
  const handleInputChange = async (servingId) => {
    let servingFilter = await foodServingData.filter((v) => v.serving_id === servingId)
    let removeArray = { ...servingFilter[0] }
    setFoodServingList(removeArray)
  }

  useEffect(() => {
    getFatsecret()
  }, [])

  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} onClick={goBack} />
      </Header>
      <Title content={foodList.food_name} subContent={foodMeasurement} />
      <CountBox />

      <RadioGroup label="surving" value={foodMeasurement} onChange={setFoodMeasurement}>
        {foodServingData.map((surving, index) => {
          return (
            <Radio
              name="surving"
              value={surving.measurement_description}
              servingId={surving.serving_id}
              key={surving.index}
              onClick={() => handleInputChange(surving.serving_id)}
              tab
            >
              <p>{surving.measurement_description}</p>
            </Radio>
          )
        })}
      </RadioGroup>

      {loading ? (
        <Flex fontWhite whdth padding>
          <div className={$.loader}>
            <div className={$.bg}></div>
            <h2>Loading</h2>
          </div>
        </Flex>
      ) : (
        <div className={$.info_box}>
          <Flex wrap between>
            <Flex padding radius shadow column start colorWhite whdth fontBlack marginBottom col2>
              <Flex paddingBottom>
                <img src={kcalIcon} alt="칼로리" />
              </Flex>
              <Flex marginTop column start>
                <p>칼로리</p>

                <h2>
                  {foodServingList.calories}
                  <span className={$.unit}>kcal</span>
                </h2>
              </Flex>
            </Flex>

            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={carbohydrateIcon} alt="탄수화물" />
              </Flex>
              <Flex marginTop column start>
                <p>탄수화물</p>
                <h2>
                  {foodServingList.carbohydrate}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={proteinIcon} alt="단백질" />
              </Flex>
              <Flex marginTop column start>
                <p>단백질</p>
                <h2>
                  {foodServingList.protein}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
            <Flex padding radius shadow column start colorWhite whdth col2 fontBlack marginBottom>
              <Flex paddingBottom>
                <img src={fatIcon} alt="지방" />
              </Flex>
              <Flex marginTop column start>
                <p>지방</p>
                <h2>
                  {foodServingList.fat}
                  <span className={$.unit}>g</span>
                </h2>
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
      <Button content="식단추가" onClick={handleClickAdd} />
    </Wrapper>
  )
}

export default FoodDetail
