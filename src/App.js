import { Header } from 'antd/lib/layout/layout';
import { useEffect, useState } from 'react';
import './App.css';
import Addtodo from './components/Addtodo';
import Edittodo from './components/Edittodo';
import Todo from './components/Todo';

function App() {

  const data = [
    {
      key: 1,
      createdAt: '14/12/2000',
      title: "onkar",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 2,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 3,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 4,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 5,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 6,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 7,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 8,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 9,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 10,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },
    {
      key: 11,
      createdAt: '14/12/2000',
      title: "birthday",
      description: 'New York No. 1 Lake Park kjfdjg dfgh asdf;;kl asdf ;khj a;sd',
      dueDate: "14/12/2090",
      tags: ['nice', 'developer'],
      status: "completed"
    },


  ]
  let todoObj

  const [Data, setData] = useState([todoObj]);
  const [change, setchange] = useState("true");
  console.log("app", Data)
  
  let notes = localStorage.getItem("notes");
  useEffect(() => {
    if (notes === null) {
      todoObj = []
    } else {
      todoObj = JSON.parse(notes);
    }
    setData(todoObj)
    // setchange("fgb")
    console.log(todoObj)
  }, [todoObj,notes]);

  console.log("app", Data)
  return (
    <div >
      <Header > <h1 style={{textAlign:"center",color:"white"}}>Add TO-DO </h1></Header>
      {/* <h3>Add new todo</h3> */}
      <Addtodo setData={setData} Data={Data} />
      <Todo setchange={setchange} Data={Data} />

    </div>
  );
}

export default App;
