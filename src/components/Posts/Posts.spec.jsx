import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = {
    posts: [
        {
            id: 1,
            title: 'title 1',
            body: 'body 1',
            cover: 'img/img1.png'
        },
        {
            id: 2,
            title: 'title 2',
            body: 'body 2',
            cover: 'img/img2.png'
        },
        {
            id: 3,
            title: 'title 3',
            body: 'body 3',
            cover: 'img/img3.png'
        },
    ]
};

describe('<Posts />', () => {

    /* Já foi testado os 'campos' de cada PostCard, não é necessário testar novamente. 
    Será testado se todos os campos estão sendo renderizados corretamente. */
    
    it('sould render posts', () => {
        render(<Posts {...props} />)

        /* GetAllByRole vai testar TODOS os elementos, ao invés de 1. 
        Com toHaveLenght é definida a quantidade esperada de elementos. */
        expect(screen.getAllByRole('heading', { name: /title/i }))
            .toHaveLength(3);
        
        /* Buscando todas as imagens */
        expect(screen.getAllByRole('img', { name: /title/i }))
            .toHaveLength(3);
        
        /* Buscando uma imagem específica */
        expect(screen.getByRole('img', { name: /title 3/i }))
            .toHaveAttribute('src', 'img/img3.png');

        /* Buscando pelo texto no body. 
        Na expressão regular abaixo, body é um texto contido na props acima,
        neste arquivo. */
        expect(screen.getAllByText(/body/i))
            .toHaveLength(3);
    });
    
    it('sould match snapshot', () => {
        const { container } = render(<Posts {...props} />)

        expect(container).toMatchSnapshot();
    });
});