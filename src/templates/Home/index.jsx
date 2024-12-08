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
    postsPerPage: 10,
    searchValue: '',
  };

  //Componente motado
  //Chamado automaticamente após o componente ser montado
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos         = await loadPosts();

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

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
    ? allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      }) 
    : posts;

    return (
      //Componente
      <section className='container'>
        
        {/* Se houver valor na busca o input é exibido */}
        {!!searchValue && (
          <>
            <h2>
              Search value: "{searchValue}" ({filteredPosts.length} result
              {filteredPosts.length === 1 ? '' : 's'})
            </h2>
            <br />
          </>
        )}
        
        <input
          onChange={this.handleChange}
          value={ searchValue }
          type="search" 
        /><br /><br /><br />

        { filteredPosts.length > 0 && (
          <Posts posts={ filteredPosts } />
        )}

        { filteredPosts.length === 0 && (
          <p>Não existem posts!</p>
        )}

        <div className="button-container">

          {/* Se não houver valor buscado, o button aparece */}
          {!searchValue && (
            <Button
              text    ="Load more posts"
              onClick ={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
}
