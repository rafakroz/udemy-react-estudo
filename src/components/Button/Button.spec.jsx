import { render, screen } from "@testing-library/react";
import { Button } from ".";
import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    //
    it('sould render the button with the text "Load more"', () => {
        // #region Teste texto
        render(<Button text="Load more" />);

        // É esperado que haja a quantidade de inserções informada
        expect.assertions(1);

        // Botão role button que contenha o texto
        const button = screen.getByRole('button', { name: /load more/i });

        // É esperado que o botão esteja na tela
        expect(button).toBeInTheDocument();

        // É esperado que o botão tenha a classe x
        // expect(button).toHaveAttribute('class', 'button');
    });

    it('sould call function on button click', () => {
        // #region Teste fn clique
        const fn = jest.fn();

        render(<Button text="Load more" onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });

        // Simula o clique no botão
        // fireEvent.click(button);
        userEvent.click(button);

        // A função foi chamada? (clique do botão)
        // expect(fn).toHaveBeenCalled();

        // A função foi chamada x vezes?
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('sould be disabled when disabled is true', () => {
        // #region Teste btn disabled
        render(<Button text="Load more" disabled={true} />);

        // const button = screen.getByRole('button', { name: /load more/i });

        // É esperado que o botão esteja desativado
        // expect(button).toBeDisabled();

        // Outra forma de escrever o código

        // É esperado que o botão esteja desativado
        expect(screen.getByRole(
            'button',
            { name: /load more/i }
        )).toBeDisabled();

        // É esperado que o botão esteja ativado
        // expect(screen.getByRole(
        //     'button',
        //     { name: /load more/i }
        // )).toBeEnabled();
    });

    it('sould be disabled when disabled is false', () => {
        // #region Teste btn enabled
        render(<Button text="Load more" disabled={false} />);

        // É esperado que o botão esteja ativado
        expect(screen.getByRole(
            'button',
            { name: /load more/i }
        )).toBeEnabled();
    });
});