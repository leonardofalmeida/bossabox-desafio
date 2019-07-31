import React from 'react';
import { Button } from '@material-ui/core';

// import { Container } from './styles';

export default function MyButton({ variant, name, color, size, children }) {
  return (
    <Button size={size} variant={variant} color={color}>
      {children}
      {name}
    </Button>
  );
}
