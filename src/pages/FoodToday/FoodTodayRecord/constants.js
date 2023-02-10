import Morning from '@assets/ic-morning-normal.png'
import Lunch from '@assets/ic-lunch-normal.png'
import Dinner from '@assets/ic-dinner-normal.png'
import Snack from '@assets/ic-snack-normal.png'
import DarkMorning from '@assets/ic-morning-white.png'
import DarkLunch from '@assets/ic-lunch-white.png'
import DarkDinner from '@assets/ic-dinner-white.png'
import DarkSnack from '@assets/ic-snack-white.png'

export const FOOD_TODAY_RECORD = [
  {
    id: 1,
    name: '아침 식사',
    value: 0,
    calorie: 0,
    food: {
      name: '바나나',
      value: 0,
      size: '중형',
      calorie: 0,
    },
    image: Morning,
    darkImage: DarkMorning,
  },
  {
    id: 2,
    name: '점심 식사',
    value: 0,
    calorie: 0,
    image: Lunch,
    darkImage: DarkLunch,
  },
  {
    id: 3,
    name: '저녁 식사',
    value: 0,
    calorie: 0,
    food: {
      name: '바나나',
      value: 0,
      size: '중형',
      calorie: 0,
    },
    image: Dinner,
    darkImage: DarkDinner,
  },
  {
    id: 4,
    name: '간식',
    value: 0,
    calorie: 0,
    image: Snack,
    darkImage: DarkSnack,
  },
]
