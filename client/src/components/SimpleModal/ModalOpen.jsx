import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { Transition } from 'react-transition-group'
import {  useContext, useEffect, useRef, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import EditIcon  from '@mui/icons-material/Edit'
import { AuthContext } from '../../context/AuthContext'
import { closeModal, fetchTaskById, updateTask } from '../../Redux/slices/modalTaskSlice'
import { updateTaskStatus } from '../../Redux/slices/tasksSlice'
import './ModalOpen.css'

export const ModalOpen = () => {
  const dispatch = useDispatch()
  const { token } = useContext(AuthContext)
  const { isModalOpen, selectedTaskId, task, loading } = useSelector((state) => state.modalTask)

  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if(selectedTaskId){
      dispatch(fetchTaskById({taskId: selectedTaskId, token}))
    }
  },[selectedTaskId, dispatch, token])

  useEffect(() => {
    if(task) {
      setDescription(task.description || '') // Если description нет, оставляем пустым
    }
  },[task])

  if(!isModalOpen) return null

  const onWrapperHandler = ev => {
    if(ev.target.classList.contains("modal-wrapper-open")) dispatch(closeModal())
  }

  const handleSaveDescription = () => {
    dispatch(updateTask({taskId: selectedTaskId, description, token}))
    setIsEditing(false)
  }

  const handleUpdateStatus = (newStatus) => {
    if(!selectedTaskId) return
    dispatch(updateTaskStatus({taskId: selectedTaskId, status: newStatus, token}))
    dispatch(closeModal()) // Закрываем модальное окно
  }
  return (
    <Transition in={isModalOpen} timeout={300} unmountOnExit={true}>
      {(state) => (
        <div className={`modal-open modal--${state}-open`}>
            <div className='modal-wrapper-open' onClick={onWrapperHandler}>
                <div className='modal-content-open'>
                    <div className='modal-headers'>
                      <div className='modal-headers_status-btn'>
                        {task?.status !== 'progress' && (
                          <button onClick={() => handleUpdateStatus('progress')} className='modal-completed-btn'>В прогрессе</button>
                        )}
                        <button onClick={() => handleUpdateStatus('done')} className='modal-completed-btn'><DoneIcon /> Выполнить задачу</button>
                      </div>
                      <button className='modal-close-btn-open' onClick={() => dispatch(closeModal())}>
                          <CloseIcon />
                      </button>
                    </div>
                    <div className='modal-main'>
                      {loading ? (
                        <p>Загрузка...</p>
                      ) : (
                        <>
                          <h2>{task?.title || 'Задача'}</h2>
                          <div className='modal-task-description'>
                            {isEditing || !description ? (
                              <>
                                <textarea
                                  ref={textareaRef}
                                  className='modal-description-autoexpand'
                                  rows='1'
                                  placeholder='Введите описания задачи...'
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                                <button onClick={handleSaveDescription} className='modal-save-desc'>Сохранить</button>
                              </>
                            ) : (
                              <>
                                <p className='modal-task-description-line'>{description}</p>
                                <button onClick={() => setIsEditing(true)} className='modal-description-edit'><EditIcon /></button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                </div>
            </div>
        </div>
        )
      }
    </Transition>
  )
}