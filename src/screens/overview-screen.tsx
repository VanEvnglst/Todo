import React, { useContext, useEffect } from 'react';
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
import { ToDoContext, useTaskCount } from '../store/contexts/task-context';

const OverviewScreen = () => {
  const { tasks, updateTaskCount } = useTaskCount();

  useEffect(() => {
    updateTaskCount();
  }, []);

  return (
    <ToDoContext>
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
            totalTasks={0}
            totalCompleted={0}
            totalPriority={0}
          />
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
    </ToDoContext>
  )
}

export default OverviewScreen;