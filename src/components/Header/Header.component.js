import React from 'react';

import { Titulo, Subtitulo } from './Header.style';

export default function Header({ titulo, subtitulo }) {
  return (
    <>
      <Titulo>{titulo}</Titulo>
      <Subtitulo>{subtitulo}</Subtitulo>
    </>
  );
}
