import React, { useCallback, useState } from 'react';
import { Text, Box, Center, VStack, themeTools, useTheme, useColorMode, useColorModeValue, Fab, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import TaskList from '../components/task-list';
import shortid from 'shortid';
import Masthead from '../components/masthead';
import NavBar from '../components/navbar';
import ThemeToggle from '../components/theme-toggle';
import TaskItem from '../components/task-item';

export default function MainScreen() {
  const initialData: any[] = [
    {
      id: shortid.generate(),
      subject: 'New Task',
      done: false
    }
  ];
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback((_item: any) => {
    setEditingItemId(null)
  }, []);

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, []);

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, []);

  const handleSetItemPriority = useCallback(item => {

  }, []);
  
  // const handlePressCheckBox = useCallback(() => {
  //   setChecked(prev => !prev)
  // }, []);

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50','primary.900')}
      w='full'
    >
      <Masthead
        title='Good morning!'
      >
        <NavBar />
      </Masthead>
      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt='20px'
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        pt='20px'
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
          onSetPriority={() => console.log('set task list')}
        />
      </VStack>
      <Fab
        position='absolute'
        renderInPortal={false}
        size='sm'
        icon={<Icon color='white' as={<AntDesign name='plus'/>} size='sm' />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false,
              priority: false,
            },
            ...data
          ])
          setEditingItemId(id)
        }}
        />
    </AnimatedColorBox>
  )
}