// import logo from './logo.svg';
import { Component } from 'react';

import './styles.css';

import { Posts }     from '../../components/Posts';
import { loadPosts } from '../../utils/load-post';
import { Button }    from '../../components/Button';

export class Home extends Component {
  //
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
  };

  //Componente motado
  //Chamado automaticamente após o componente ser montado
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({ 
      posts:    postsAndPhotos.slice(page, postsPerPage), //posts na página
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;

    //Próxima fatia de posts a serem acrescidos na página
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    //Spread operator vai expalhar os post ao invés de colocar outros arrays
    posts.push(...nextPosts);

    //Alterando o state com os posts e a página com o novo valor
    this.setState({ posts, page: nextPage });
  }

  render() {
    const { posts } = this.state;

    return (
      //Componente
      <section className='container'>
        <Posts posts={ posts } />
        <Button
          text="Load more posts"
          onClick={this.loadMorePosts}
        />
      </section>
    );
  }
}
