import React, { useEffect } from 'react';
import { Box, VStack, Icon, HStack, Text, Heading, useColorModeValue } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface Props {
  totalPriority: number
  totalCompleted: number
  totalTasks: number
}

interface OverviewItemData {
  title: string,
  value: number
}
const TasksOverview = (props: Props) => {
  const { totalPriority, totalCompleted, totalTasks } = props;
  
  const OverviewItem = (props: OverviewItemData) => {
    const { title, value } = props;

    return (
      <HStack  
        flex={1}
        space={1} 
        px={2} 
        mb={10}
        alignItems='center'
        justifyContent='space-between'
      >
        <Heading
          color={useColorModeValue('gray.700', 'white')}
        >{title}</Heading>
        <Text
          fontSize={'xl'}
          fontWeight='bold'
          color='gray.700'
        >{value}</Text>
      </HStack>
    )
  }

return (
  <VStack flex={1} space={1} p={5}>
      <OverviewItem
        title={'Total tasks'}
        value={totalTasks}
      />
      <OverviewItem
        title={'Total Priority Tasks'}
        value={totalPriority}
      />
      <OverviewItem
        title={'Total Completed Tasks'}
        value={totalCompleted}
      />
  </VStack>
)
}

export default TasksOverview;
