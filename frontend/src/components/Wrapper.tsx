import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box mx="auto" mt={8} maxW="650px" w="100%">
      {children}
    </Box>
  );
};
