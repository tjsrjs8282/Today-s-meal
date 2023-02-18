import React, { useEffect, useState, useRef, useCallback } from 'react'
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
import kcalIcon from '@assets/ic-kcal-normal.png'
import carbohydrateIcon from '@assets/ic-carbohydrate-normal.png'
import proteinIcon from '@assets/ic-protein-normal.png'
import fatIcon from '@assets/ic-fat-normal.png'
import { fatsecretInstance } from '@api/axiosInstance'
import { dateState, partState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'
import dayjs from 'dayjs'

const FoodDetail = () => {
  const navigate = useNavigate()
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  const [foodList, setFoodList] = useState([])
  const [foodServingData, setFoodServingData] = useState([])
  const [foodServingList, setFoodServingList] = useState([{}])
  const [foodMeasurement, setFoodMeasurement] = useState('')
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const weeks = ['일', '월', '화', '수', '목', '금', '토']
  const date = dayjs(dateRecoil).format(`MM월 DD일 ${weeks[dayjs(dateRecoil).get('d')]}요일`)
  let sesstionFoods = localStorageService().get('FOODS')
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
    setFoodMeasurement(arrCheck[0].measurement_description)
    setFoodServingList([
      {
        id: res.data.food.food_id,
        name: res.data.food.food_name,
        date: date,
        part: partRecoil,
        measurement: arrCheck[0].measurement_description,
        calories: arrCheck[0].calories,
        carbohydrate: arrCheck[0].calories,
        protein: arrCheck[0].protein,
        fat: arrCheck[0].fat,
      },
    ])

    // if (!sesstionFoods) {
    //   localStorageService().set('FOODS', [
    //     {
    //       id: res.data.food.food_id,
    //       name: res.data.food.food_name,
    //       date: date,
    //       part: partRecoil,
    //       measurement: arrCheck[0].measurement_description,
    //       calories: arrCheck[0].calories,
    //       carbohydrate: arrCheck[0].calories,
    //       protein: arrCheck[0].protein,
    //       fat: arrCheck[0].fat,
    //     },
    //   ])
    // }

    setLoading(false)
  }
  const handleInputChange = async (servingId) => {
    let servingFilter = await foodServingData.filter((v) => v.serving_id === servingId)
    let removeArray = [
      {
        id: foodList.food_id,
        name: foodList.food_name,
        date: date,
        part: partRecoil,
        measurement: servingFilter[0].measurement_description,
        calories: servingFilter[0].calories,
        carbohydrate: servingFilter[0].calories,
        protein: servingFilter[0].protein,
        fat: servingFilter[0].fat,
      },
    ]
    if (sesstionFoods.length === 1) {
      sesstionFoods.pop()
      sesstionFoods.push(...removeArray)
      // localStorageService().set('FOODS', sesstionFoods)
    }

    setFoodServingList(removeArray)
  }
  console.log(foodServingList)

  const handleClickAdd = () => {
    if (sesstionFoods) {
      sesstionFoods.push({ ...foodServingList[0] })
      localStorageService().set('FOODS', sesstionFoods)
    } else {
      localStorageService().set('FOODS', foodServingList)
    }

    navigate('/today')
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
