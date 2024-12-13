import React from 'react';

import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

const { describe, it, expect } = require('@jest/globals');

describe('<Button />', () => {
  // #region Teste texto
  it('sould render the button with the text "Load more"', () => {
    //
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    // É esperado que haja a quantidade de inserções informada
    expect.assertions(1);

    // Botão role button que contenha o texto
    const button = screen.getByRole('button', { name: /load more/i });

    // É esperado que o botão esteja na tela
    expect(button).toBeInTheDocument();

    // É esperado que o botão tenha a classe x
    // expect(button).toHaveAttribute('class', 'button');
  });

  // #region Teste fn clique
  it('sould call function on button click', () => {
    //
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });

    // Simula o clique no botão
    // fireEvent.click(button);
    userEvent.click(button);

    // A função foi chamada? (clique do botão)
    // expect(fn).toHaveBeenCalled();

    // A função foi chamada x vezes?
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // #region Teste btn disabled
  it('sould be disabled when disabled is true', () => {
    //
    const fn = jest.fn();

    render(<Button text="Load more" disabled={true} onClick={fn} />);

    // const button = screen.getByRole('button', { name: /load more/i });

    // É esperado que o botão esteja desativado
    // expect(button).toBeDisabled();

    // Outra forma de escrever o código

    // É esperado que o botão esteja desativado
    expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled();

    // É esperado que o botão esteja ativado
    // expect(screen.getByRole(
    //     'button',
    //     { name: /load more/i }
    // )).toBeEnabled();
  });

  // #region Teste btn enabled
  it('sould be disabled when disabled is false', () => {
    //
    const fn = jest.fn();

    render(<Button text="Load more" disabled={false} onClick={fn} />);

    // É esperado que o botão esteja ativado
    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
  });

  it('should be enabled when disabled prop is not provided', () => {
    //
    const fn = jest.fn();

    // Renderiza o botão sem a prop disabled
    render(<Button text="Load more" onClick={fn} />);

    /* Verifica que o botão está habilitado,
      porque o valor padrão de disabled é false */
    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
  });

  // #region Snapshot do Button
  it('sould match snapshot', () => {
    //
    const fn = jest.fn();

    const { container } = render(
      <Button text="Load more" disabled={false} onClick={fn} />,
    );

    expect(container).toMatchSnapshot();
  });
});
