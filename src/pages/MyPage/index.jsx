import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { localStorageService } from '@utils/localStorage.service'
import { useRecoilState } from 'recoil';
import { themeState } from '@store'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'


export default function MyPage () {
  const [userInfo, setUserInfo] = useState({})
  const [theme, setTheme] = useRecoilState(themeState)
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const handleChangeTheme = useCallback(() => {
    if (theme === 'DARK') {
      localStorageService().set('THEME', 'LIGHT')
      document.documentElement.setAttribute('data-theme', 'LIGHT')
      setTheme('LIGHT')
      return
    }
    localStorageService().set('THEME', 'DARK')
    document.documentElement.setAttribute('data-theme', 'DARK')
    setTheme('DARK')
  }, [theme])

  useEffect(() => {
    const Info = localStorageService().get('USER_INFO')
    setUserInfo(Info)
  }, [])
  return (
    <Wrapper colorWhite>
      <Header>
        <Flex width between>
          <IconButton kinds="back" onClick={goBack} />
          <button onClick={handleChangeTheme}>dddddddddd</button>
        </Flex>
      </Header>
      <Flex>
        <div></div>
        <div>
          <h2>{userInfo.userName}</h2>
          <ul>
            {
              Object.values(userInfo).filter((v) => v !== userInfo.userName)
                .map((li, i) => <li key={i}>{li}</li>)
            }
          </ul>
        </div>
        <IconButton kinds="setting"/>
      </Flex>
    </Wrapper>
  );
};

