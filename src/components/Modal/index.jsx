import $ from './modal.module.scss'
import Flex from '@components/Flex'
import Button from '@components/Button'

export default function Modal({ title, content, onClick, onClose, children }) {
  return (
    <div className={$.modal_wrap}>
      <div className={$.modal_box}>
        <Flex column>
          <h2>{title}</h2>
          {content && <p>{content}</p>}
        </Flex>
        {children}
        <Flex width marginTop>
          {onClose && (
            <Flex marginRight width>
              <Button content="취소" nonefixed noneBackground onClick={onClose}></Button>
            </Flex>
          )}

          <Flex marginRigth width>
            <Button content="확인" nonefixed onClick={onClick}></Button>
          </Flex>
        </Flex>
      </div>
    </div>
  )
}
