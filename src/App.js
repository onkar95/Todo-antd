
import { Layout } from 'antd';
import { useContext, useEffect } from 'react';
import './App.css';
import Addtodo from './components/Addtodo';
import Searchbar from './components/Searchbar';
import Todo from './components/Todo';
import DataContext from './context/Todo';

function App() {
  const { Header, Sider, Content } = Layout;
  const { setData, Width, added } = useContext(DataContext);

  let todoObj


  useEffect(() => {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
      todoObj = []
    } else {
      todoObj = JSON.parse(notes);
    }
    setData(() => todoObj)
  }, [todoObj, added]);




  return (
    <div >
      {Width > 800 ?
        <Layout>
          <Sider width={300} style={{ backgroundColor: "rgb(137 133 133 / 0%)" }}>
            <Header > <h1 style={{ textAlign: "center", color: "white" }}>Add To-do</h1></Header>

            <Addtodo />
          </Sider>
          <Layout>
            <Header> <h1 style={{ textAlign: "center", color: "white" }}> TO-DO App </h1></Header>
            <Content style={{ margin: "15px" }}>
              <Searchbar />
              <Todo />

            </Content>
          </Layout>
        </Layout>
        :
        <div >
          <Header > <h1 style={{ textAlign: "center", color: "white" }}>Add TO-DO </h1></Header>
          <Addtodo />
          <Searchbar />
          <Todo />

        </div>
      }
    </div>
  );
}

export default App;

// const data = [
//   {
//     key: 1,
//     createdAt: '14/12/2000',
//     title: "onkar",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 2,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 3,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 4,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 5,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 6,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 7,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 8,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 9,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 10,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },
//   {
//     key: 11,
//     createdAt: '14/12/2000',
//     title: "birthday",
//     description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
//     dueDate: "14/12/2090",
//     tags: ['nice', 'developer'],
//     status: "completed"
//   },


// ]