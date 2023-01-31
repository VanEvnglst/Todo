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
      h='400px'
      bg='primary.300'
    >
    {children}
    <Heading color='gray.700' p={6} size='xl'>
      {title}
    </Heading>
    </Box>
  </VStack>
)
}
export default Masthead;