import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import kcalIcon from '@assets/ic-kcal-normal.png'
import carbohydrateIcon from '@assets/ic-carbohydrate-normal.png'
import proteinIcon from '@assets/ic-protein-normal.png'
import fatIcon from '@assets/ic-fat-normal.png'
import $ from './foodDetail.module.scss'
import Loding from '@components/Loding'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import CountBox from '@components/CountBox'
import Button from '@components/Button'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import dayjs from 'dayjs'
import { dateState, partState } from '@store'
import { fatsecretInstance } from '@api/axiosInstance'
import { localStorageService } from '@utils/localStorage.service'

const FoodDetail = () => {
  const navigate = useNavigate()
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  const [servingId, setServingId] = useState(0)
  const [count, setCount] = useState(1)
  const [foodList, setFoodList] = useState([])
  const [foodServingData, setFoodServingData] = useState([])
  const [foodServingList, setFoodServingList] = useState([{}])
  const [foodMeasurement, setFoodMeasurement] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토']
  const date = dayjs(dateRecoil).format(`MM월 DD일 ${WEEKS[dayjs(dateRecoil).get('d')]}요일`)

  const goBack = () => {
    navigate('../search')
  }

  async function getFatsecret() {
    setLoading(true)
    let res = await fatsecretInstance.get(`?method=food.get.v2&format=json&food_id=${id}`)
    if (res.err) {
      console.log(err)
      return
    }
    const servingData = res.data.food.servings.serving
    let arrCheck = Array.isArray(servingData) ? servingData : [servingData]

    setFoodList(res.data.food)
    setFoodServingData(arrCheck)
    setServingId(arrCheck[0].serving_id)
    setFoodMeasurement(arrCheck[0].measurement_description)
    setFoodServingList([
      {
        id: res.data.food.food_id + new Date().getTime(),
        name: res.data.food.food_name,
        date: date,
        part: partRecoil,
        measurement: arrCheck[0].measurement_description,
        calories: Math.ceil(arrCheck[0].calories),
        carbohydrate: Math.ceil(arrCheck[0].carbohydrate),
        protein: Math.ceil(arrCheck[0].protein),
        fat: Math.ceil(arrCheck[0].fat),
      },
    ])
    setLoading(false)
  }
  const handleInputChange = async (id) => {
    setServingId(id)
    const servingFilter = await foodServingData.filter((v) => v.serving_id === id)
    setFoodServingList([
      {
        id: foodList.food_id + new Date().getTime(),
        name: foodList.food_name,
        date: date,
        part: partRecoil,
        measurement: servingFilter[0].measurement_description,
        calories: Math.ceil(servingFilter[0].calories * count),
        carbohydrate: Math.ceil(servingFilter[0].carbohydrate * count),
        protein: Math.ceil(servingFilter[0].protein * count),
        fat: Math.ceil(servingFilter[0].fat * count),
      },
    ])
  }
  const handleClickAdd = () => {
    const sesstionPartFoods = localStorageService().get('FOOD_TOTAL')
    if (!loading) {
      if (sesstionPartFoods) {
        sesstionPartFoods.push({ ...foodServingList[0] })
        localStorageService().set('FOOD_TOTAL', sesstionPartFoods)
      } else {
        localStorageService().set('FOOD_TOTAL', foodServingList)
      }

      navigate('/today')
    }
    return
  }

  useEffect(() => {
    getFatsecret()
  }, [])

  useEffect(() => {
    handleCountChangess()
  }, [count])

  const handleCountChange = (e) => {
    setCount(e.target.value)
  }

  const handleCountChangess = async () => {
    const servingFilter = await foodServingData.filter((v) => v.serving_id === servingId)
    setFoodServingList([
      {
        id: foodList.food_id + new Date().getTime(),
        name: foodList.food_name,
        date: date,
        part: partRecoil,
        measurement: servingFilter[0].measurement_description,
        calories: Math.ceil(servingFilter[0].calories * count),
        carbohydrate: Math.ceil(servingFilter[0].carbohydrate * count),
        protein: Math.ceil(servingFilter[0].protein * count),
        fat: Math.ceil(servingFilter[0].fat * count),
      },
    ])
  }

  const handleCountCalculation = (count) => {
    setCount(count)
  }

  console.log(foodServingList)
  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} onClick={goBack} />
      </Header>
      <Title content={foodList.food_name} subContent={foodMeasurement} />
      <CountBox
        value={count}
        onChange={handleCountChange}
        handleCountCalculation={handleCountCalculation}
      />
      <RadioGroup label="surving" value={foodMeasurement} onChange={setFoodMeasurement}>
        {foodServingData.map((surving) => {
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
        <Loding />
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
                  {foodServingList[0].calories}
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
                  {foodServingList[0].carbohydrate}
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
                  {foodServingList[0].protein}
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
                  {foodServingList[0].fat}
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
