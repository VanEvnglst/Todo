import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base';

interface Props {
  title: string
  children: React.ReactNode
}

const Masthead = ({ title, children}: Props) => {
return (
  <VStack h='300px' pb={5}>
    <Box
      w='full'
      h='300px'
      bg='amber.400'
    />
    {children}
    <Box flex={1} />
    <Heading color='white' p={6} size='xl'>
      {title}
    </Heading>
  </VStack>
)
}
export default Masthead;