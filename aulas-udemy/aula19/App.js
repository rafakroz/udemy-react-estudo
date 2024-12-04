// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  //
  state = {
    posts: [
      {
        id: 1,
        title: 'O título 1',
        body: 'O corpo 1'
      },
      {
        id: 2,
        title: 'O título 2',
        body: 'O corpo 2'
      },
      {
        id: 3,
        title: 'O título 3',
        body: 'O corpo 3'
      },
    ]
  };

  //Componente motado
  //Chamado automaticamente após o componente ser montado
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    //Faz uma requisição para a API de posts
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    
    // Aguarda a resolução das promessas
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    //Convertendo para Json
    const postJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    });

    //Setando o estado para o posts
    this.setState({ posts: postsAndPhotos });
  }

  render() {
    const { posts } = this.state;

    return (
      //Componente
      <section className='container'>
        <div className="posts"> 
          {posts.map(post => (
            <div className='post'>
              <img src={post.cover} alt={post.title} />
              <div key={post.id} className='post-content'>
                <h1 >{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
