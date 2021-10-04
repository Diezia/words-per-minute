import React, { useEffect, useState } from 'react'

export const MostrarPalabra = ({ texto, irf }) => {
  const [palabra, setPalabra] = useState('');
  let texto_array = texto.split(" ");
  
  const doInterval = () => {
    setPalabra(texto_array.shift());
  }

  useEffect(() => {
    const interval = setInterval( doInterval, irf)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <h1>{palabra}</h1>
  )
}
