import React, { useCallback, useState } from 'react';
import { VStack, useColorModeValue, Fab, Icon, Text, Pressable, HStack } from 'native-base';
import shortid from 'shortid';
import { AntDesign } from '@expo/vector-icons';
import AnimatedColorBox from '../components/animated-color-box';
import TaskList from '../components/task-list';
import TasksOverview from '../components/task-overview';
import Masthead from '../components/masthead';
import NavBar from '../components/navbar';


export default function MainScreen() {
  const initialData: any[] = [
    {
      id: shortid.generate(),
      subject: 'Sample Task',
      done: false,
      priority: false,
    }
  ];
  const initialPriorityData: any[] = [];
  const initialCompletedData: any[] = [];

  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [priorityData, setPriorityData] = useState(initialPriorityData);
  const [completedData, setCompletedData] = useState(initialCompletedData);
  const [seePriority, setSeePriority] = useState(false);
  const [seeOverview, setSeeOverview] = useState(false);

  const handleToggleTaskItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    });

    let completedList = completedData;
    if (completedList.some(complete => complete.id === item.id))
      completedList.splice(completedList.indexOf(item), 1);
    else
      completedList.push(item)

    setCompletedData(completedList)
  }, []);

  const handleChangeTaskItemSubject = useCallback((item: any, newSubject: string) => {
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

  const handlePressTaskItemLabel = useCallback((item: any) => {
    setEditingItemId(item.id)
  }, []);

  const handleRemoveItem = useCallback((item: any) => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, []);

  const handleItemPriority = useCallback((item: any) => {
      setData(prevData => {
        const newData = [...prevData]
        const index = prevData.indexOf(item);
        newData[index] = {
          ...item,
          priority: !item.priority,
        }
        return newData;
      });

      let newPriority = priorityData;       
      if (newPriority.some(priority => priority.id === item.id))
        newPriority.splice(newPriority.indexOf(item), 1)
      else
        newPriority.push(item);
      setPriorityData(newPriority)

  }, []);
  
  const handlePriorityListToggle = useCallback(() => {
    setSeePriority(prevData => !prevData)
  }, []);

  const handleTaskOverviewToggle = useCallback(() => {
    setSeeOverview(prevData => !prevData);
  }, []);

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
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        pt='20px'
      >
        <HStack>
        <Pressable
          onPress={handlePriorityListToggle}
          w={200}
          h={30}
          ml={5}
          mb={10}          
        >
           <Text 
             fontSize={16}
             color={'blue.800'}
             underline
           >See all priority</Text>
        </Pressable>
        <Pressable
          onPress={handleTaskOverviewToggle}
          w={200}
          h={30}
          ml={5}
          mb={10}          
        >
           <Text 
             fontSize={16}
             color={'blue.800'}
             underline
           >{seeOverview ? 'Hide task overview' : 'See task overview'}</Text>
        </Pressable>
        </HStack>
        {seeOverview ?
          <TasksOverview
            totalTasks={data.length}
            totalPriority={priorityData.length}
            totalCompleted={completedData.length}
          />
        : null
        }
        {seePriority ?
        <TaskList
          data={priorityData}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
          onSetPriority={handleItemPriority}
        />
        :
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
          onSetPriority={handleItemPriority}
        />}
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