import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView =makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
  priority: boolean
}

interface TaskListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void 
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
  onSetPriority: (item: TaskItemData) => void
}

interface TaskItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
  onSetPriority: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove,
    onSetPriority
  } = props;

  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback((subject: string) => {
    onChangeSubject(data, subject)
  }, [data, onChangeSubject]);

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove]);

  const handlePriority = useCallback(() => {
    onSetPriority(data)
  }, [data, onSetPriority])

  return (
    <StyledView
      w='full'
      from={{ 
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isPriority={data.priority}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
        onSetPriority={handlePriority}
      />
    </StyledView>
  )
}

const TaskList = (props: TaskListProps) => {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem,
    onSetPriority
  } = props
  const refScrollView = useRef(null)


  return (
    <StyledScrollView
      ref={refScrollView}
      w='full'
    >
    <AnimatePresence>
      {data.map(item => (
        <AnimatedTaskItem
          key={item.id}
          data={item}
          simultaneousHandlers={refScrollView}
          isEditing={item.id === editingItemId}
          onToggleItem={onToggleItem}
          onChangeSubject={onChangeSubject}
          onFinishEditing={onFinishEditing}
          onPressLabel={onPressLabel}
          onRemove={onRemoveItem}
          onSetPriority={onSetPriority}
        />
      ))}
    </AnimatePresence>
    </StyledScrollView>
  )
}

export default TaskList;