
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import React, { useContext } from 'react';
import 'antd/dist/antd.min.css'
import moment from 'moment';
import DataContext from '../context/Todo';
import { Header } from 'antd/lib/layout/layout';

const Addtodo = () => {
    const { Data, setadded } = useContext(DataContext);
    const { TextArea } = Input;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return day + '/' + month + '/' + year;
    }
    const validateInput = (val) => {
        console.log(val)
        if (val?.title === "" || val.title === undefined) {
            alert("plese enter title")
            return false
        } else if (val?.date === undefined) {
            alert("select date")
            return false
        } else if (val?.description === undefined) {
            alert('add description')
            return false
        }
        return true
    }
    const handelsubmit = async (e) => {
        if (validateInput(e)) {
            const Obj = {
                key: parseInt(Math.random() * 100),
                createdAt: formatDate(e?.date[0]?._d),
                title: e?.title,
                description: e?.description,
                dueDate: formatDate(e?.date[1]?._d),
                tags: e?.tags?.split(','),
                status: e?.status || "Open"
            }
            await Data.push(Obj)
            await localStorage.setItem("notes", JSON.stringify(Data))
            form.resetFields();
            setadded(() => false)
        }
    }

    return (
        <div style={{ margin: 20 }} className="addTodo">
            <h2>Add Todo</h2>
            <hr />
            <Form
                form={form}
                onFinish={(values) => {
                    handelsubmit(values)
                    console.log(values)
                }}

            >

                <Form.Item label="Title" name='title'>
                    <Input />
                </Form.Item>
                <Form.Item label="description" name='description'>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Date" name='date'>
                    <RangePicker
                        defaultValue={[moment(formatDate(Date.now()), dateFormatList[0]), moment(formatDate(Date.now()), dateFormatList[0])]}
                        format={dateFormatList[0]}
                    />
                </Form.Item>
                <Form.Item label="tags" name='tags'>
                    <Input placeholder='enter space separeted unique tags' />
                </Form.Item>
                <Form.Item label="Status" name='status'>
                    <Select placeholder='select status'>
                        <Select.Option value="Open">Open</Select.Option>
                        <Select.Option value="Working">Working</Select.Option>
                        {/* <Select.Option value="Done">Done</Select.Option> */}
                        {/* <Select.Option value="Overdue">Overdue</Select.Option> */}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit"> Create</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addtodo;