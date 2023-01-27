import React, { useContext } from 'react';
import {
  ScrollView,
  Box,
  VStack,
  useColorModeValue
} from 'native-base';
import Navbar from '../components/navbar';
import Masthead from '../components/masthead';
import AnimatedColorBox from '../components/animated-color-box';
import TasksOverview from '../components/task-overview';
import { ToDoContext } from './main-screen';

const OverviewScreen = () => {
  const todoValue = useContext(ToDoContext);
  console.log('todo', todoValue)
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w='full'
    >
      <Masthead
        title='Tasks overview'
      >
        <Navbar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius='20px'
        borderTopRightRadius='20px'
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt='-20px'
        pt='30px'
      >
        <VStack flex={1} space={4}>
          <TasksOverview 
            totalTasks={todoValue?.totalTasks}
            totalCompleted={todoValue?.totalCompleted}
            totalPriority={todoValue?.totalPriority}
          />
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default OverviewScreen;