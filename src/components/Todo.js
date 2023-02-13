import React, { useState, useRef, useContext } from 'react'
import { Space, Table, Tag, Modal } from 'antd';
import 'antd/dist/antd.min.css'
import {
    Button,
    Input,
} from 'antd';
import Edittodo from './Edittodo';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Header } from 'antd/lib/layout/layout';
import DataContext from '../context/Todo';


const Todo = () => {
    const { setData, Data, FilterData, seteditRecord, setedit } = useContext(DataContext);


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
            sorter: (a, b) => a.createdAt - b.createdAt,
            with: 100,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            with: 100,
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            with: 100,
            sorter: (a, b) => a.description.length - b.description.length,

        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            ellipsis: true,
            with: 100,
            sorter: (a, b) => {
                console.log(a.dueDate, b.dueDate)
                return a.dueDate - b.dueDate
            },
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            ellipsis: true,
            with: 100,
            filters: [
                {
                    text: 'NICE',
                    value: 'nice',
                },
                {
                    text: 'DEVELOPER',
                    value: 'developer',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            ...getColumnSearchProps('tags', "status"),
            sorter: (a, b) => a.tags ? a.tags.length : 0 - b.tags ? b.tags.length : 0,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <>
                    {
                        record?.tags?.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';

                            if (tag === 'loser') {
                                color = 'volcano';
                            }

                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            with: 100,
            filters: [
                {
                    text: 'completed',
                    value: 'completed',
                },
                {
                    text: 'Done',
                    value: 'Done',
                },
                {
                    text: 'Working',
                    value: 'Working',
                },
                {
                    text: 'Overdue',
                    value: 'Overdue',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record?.status?.indexOf(value) === 0,
        },

        {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            with: 100,
            render: (_, record) => (
                <>
                    <button onClick={() => handeldelete(record)}>delete</button>
                    <button onClick={() => handeledit(record)}>edit</button>
                </>
            )

        },
    ];

    const handeldelete = (record) => {
        Modal.confirm({
            title: "are you sure",
            onOk: async () => {
                const filter = await Data.filter(val => {
                    return val.key !== record.key
                })
                setData(filter)
                localStorage.setItem("notes", JSON.stringify(filter))
            }
        })

    }
    const handeledit = (record) => {
        setedit(true)
        seteditRecord(() => record)
    }


    return (
        <div >
            <Header > <h1 style={{ textAlign: "center", color: "white" }}>Table</h1></Header>

            <div>
                {FilterData[0] === undefined ?
                    < Table columns={columns} dataSource={Data}
                        scroll={{
                            x: 1300,
                        }}
                        pagination={{ defaultPageSize: 6, position: ["bottomCenter"] }} />
                    : < Table columns={columns} dataSource={FilterData}
                        pagination={{ defaultPageSize: 6, position: ["bottomCenter"] }}
                        scroll={{
                            x: 1300,
                        }}
                    />
                }
                <Edittodo />
            </div>

        </div >

    )
}



export default Todo