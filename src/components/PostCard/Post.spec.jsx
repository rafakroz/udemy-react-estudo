import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
        // #region render PostCard
        render(<PostCard {...props} />);

        //Checando se a img, com o título específico está na tela
        // expect(screen.getByRole('img', { name: /title 1/i })).toBeInTheDocument();

        //Procurando a img que tenha o título específico [mesmo do moc, neste test]
        //E tenha o src com o valor im/img.pn
        expect(screen.getByRole('img', { name: /title 1/i }))
            .toHaveAttribute('src', 'img/img.png');

        //Verificar um heading (h1, h2,...) que contenha o título xxx
        expect(screen.getByRole('heading', { name: '1 - title 1' })).toBeInTheDocument();

        //Verificar sem o body contém o texto xxx
        expect(screen.getByText('body 1')).toBeInTheDocument();

        //Verificar se o postcard contém o alt do img
        expect(screen.getByAltText(/title 1/i))
            .toHaveAttribute('src', 'img/img.png');
    });

    it('should match snapshot', () => {
        // #region snapshot PostCard
        const { container } = render(<PostCard {...props} />);

        /* Cria um uma pasta, com uma "foto" do código e, qualquer modificação do
        código, fará com que o teste não passe, pois, estará diferente da estrutura
        definida como a versão final do código. */
        expect(container).toMatchSnapshot();

        /* Caso seja preciso de fato modificar a estrutura do código, retirar ou
        inserir campos e etc, será preciso atualizar o snapshot, pressionando a tecla u. 
        E deste ponto em diante, caso queira reverter a modificação do código, será preciso
        atualizar novamente o snapshot */
    }); 
});