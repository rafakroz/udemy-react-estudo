import React from 'react';

import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput />', () => {
  /* Verificar se há valor no searchValue */
  it('should have a value of searchValue', () => {
    /* A função não precisa fazer nada. Ela é criada apenas para verificar se uma
        função específica foi chamada. */
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe('testando');
  });

  /* Verifica se a função é chamada a cada digito do teclado */
  it('should call handleChange function on each key pressed', () => {
    //
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue="valor buscado" />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = 'o valor';

    // No input, será inserido o valor definido
    userEvent.type(input, value);

    // Testando se o valor do input é igual ao value
    expect(input.value).toBe('valor buscado');

    // Saber se a função foi chamada na quantidade de dígitos de const value
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('sould match snapshot', () => {
    //
    const fn = jest.fn();

    const { container } = render(
      <TextInput handleChange={fn} searchValue="" />,
    );

    expect(container).toMatchSnapshot();
  });
});
