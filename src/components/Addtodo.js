

import {
    Button,
    Card,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import React from 'react';
import 'antd/dist/antd.min.css'
import moment from 'moment';

const Addtodo = ({ setchange, Data }) => {

    const { TextArea } = Input;
    // const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const dateFormat = 'YYYY/MM/DD';
    const { RangePicker } = DatePicker;
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

    const handelsubmit = (e) => {
        console.log(e)
        console.log(formatDate(e?.date[0]?._d))
        console.log(formatDate(e?.date[1]?._d))
        const Obj = {
            key: parseInt(Math.random() * 100),
            createdAt: formatDate(e?.date[0]?._d),
            title: e?.title,
            description: e?.description,
            dueDate: formatDate(e?.date[1]?._d),
            tags: e?.tags?.split(','),
            status: e?.status
        }
        Data.push(Obj)
        localStorage.setItem("notes", JSON.stringify(Data))
        // setchange("ok")
    }
    return (
        <div style={{  margin: 20 }}>
            <Form
                onFinish={(values) => handelsubmit(values)}
            >

                <Form.Item label="Title" name='title'>
                    <Input />
                </Form.Item>
                <Form.Item label="description" name='description'>
                    <TextArea rows={4} />
                </Form.Item>
                {/* <Form.Item label="createdAt" name='createdAt'>

<DatePicker format={dateFormatList} />
</Form.Item>
                <Form.Item label="dueDate" name='dueDate'>

                <DatePicker format={dateFormatList} />
                </Form.Item> */}
                <Form.Item label="Date" name='date'>
                    <RangePicker
                        defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                        format={dateFormat}
                    />
                </Form.Item>
                <Form.Item label="tags" name='tags'>
                    <Input placeholder='enter space separeted unique tags' />
                </Form.Item>
                <Form.Item label="Status" name='status'>
                    <Select placeholder='select status'>
                        <Select.Option value="Open">Open</Select.Option>
                        <Select.Option value="Working">Working</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                        <Select.Option value="Overdue">Overdue</Select.Option>
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