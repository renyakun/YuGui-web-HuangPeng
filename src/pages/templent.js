import React from 'react';

class Templent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
    }


    render() {
        return (
            <div>
              xzcgvxcv
            </div>
        )
    }
}


export default Templent;







// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import { Card, Modal, Button} from 'antd';
// import React, { PureComponent } from 'react';




// class Templent extends PureComponent {
//   constructor() {
//     //console.log('01构造函数');
//     super();
//     this.state = {
//       msg: '我是一个msg',
//       ModalText: 'Content of the modal',
//       visible: false,
//       confirmLoading: false,
//     };
//   }
//   //组件将要挂载的时候触发的生命周期函数
//   // componentWillMount() {

//   //   console.log('02组件将要挂载');
//   // }
//   // //组件挂载完成的时候触发的生命周期函数
//   // componentDidMount() {

//   //   //dom操作放在这个里面    请求数据也放在这个里面

//   //   console.log('04组件将要挂载');
//   // }


//   // //是否要更新数据  如果返回true才会执行更新数据的操作
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   console.log('01是否要更新数据');

//   //   console.log(nextProps);

//   //   console.log(nextState);

//   //   return true;
//   // }

//   // //将要更新数据的时候触发

//   // componentWillUpdate() {
//   //   console.log('02组件将要更新');
//   // }
//   // //组件更新完成
//   // componentDidUpdate() {
//   //   console.log('04组件数据更新完成');
//   // }

//   // // 你在父组件里面改变props传值的时候触发的

//   // componentWillReceiveProps() {

//   //   console.log('父子组件传值，父组件里面改变了props的值触发的方法')
//   // }

//   // setMsg = () => {

//   //   this.setState({

//   //     msg: '我是改变后的msg的数据'
//   //   })
//   // }

//   // //组件销毁的时候触发的生命周期函数   用在组件销毁的时候执行操作
//   // componentWillUnmount() {

//   //   console.log('组件销毁了');
//   // }


//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = () => {
//     this.setState({
//       ModalText: 'The modal will be closed after two seconds',
//       confirmLoading: true,
//     });
//     setTimeout(() => {
//       this.setState({
//         visible: false,
//         confirmLoading: false,
//       });
//     }, 2000);
//   };

//   handleCancel = () => {
//     console.log('Clicked cancel button');
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     //console.log('03数据渲染render');
//     const { visible, confirmLoading, ModalText } = this.state;
//     return (
//       <PageHeaderWrapper>
//         <Card bordered={false}>
//           生命周期函数演示--- {this.state.msg}-----{this.props.title}

//           <br />
//           <br />

//           <Button type="primary" onClick={this.setMsg}>更新msg的数据</Button>

//           <div>
//             <Button type="primary" onClick={this.showModal}>
//               Open Modal with async logic
//             </Button>
//             <Modal
//               title="Title"
//               visible={visible}
//               onOk={this.handleOk}
//               confirmLoading={confirmLoading}
//               onCancel={this.handleCancel}
//             >
//               <p>{ModalText}</p>
//             </Modal>
//           </div>

//         </Card>
//       </PageHeaderWrapper>
//     );
//   }
// }

// export default Templent;


// import { Table, Input, Button, Popconfirm, Form } from 'antd';

// const EditableContext = React.createContext();

// const EditableRow = ({ form, index, ...props }) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props} />
//   </EditableContext.Provider>
// );

// const EditableFormRow = Form.create()(EditableRow);

// class EditableCell extends React.Component {
//   state = {
//     editing: false,
//   };

//   toggleEdit = () => {
//     const editing = !this.state.editing;
//     this.setState({ editing }, () => {
//       if (editing) {
//         this.input.focus();
//       }
//     });
//   };

//   save = e => {
//     const { record, handleSave } = this.props;
//     this.form.validateFields((error, values) => {
//       if (error && error[e.currentTarget.id]) {
//         return;
//       }
//       this.toggleEdit();
//       handleSave({ ...record, ...values });
//     });
//   };

//   renderCell = form => {
//     this.form = form;
//     const { children, dataIndex, record, title } = this.props;
//     const { editing } = this.state;
//     return editing ? (
//       <Form.Item style={{ margin: 0 }}>
//         {form.getFieldDecorator(dataIndex, {
//           rules: [
//             {
//               required: true,
//               message: `${title} is required.`,
//             },
//           ],
//           initialValue: record[dataIndex],
//         })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
//       </Form.Item>
//     ) : (
//         <div
//           className="editable-cell-value-wrap"
//           style={{ paddingRight: 24 }}
//           onClick={this.toggleEdit}
//         >
//           {children}
//         </div>
//       );
//   };

//   render() {
//     const {
//       editable,
//       dataIndex,
//       title,
//       record,
//       index,
//       handleSave,
//       children,
//       ...restProps
//     } = this.props;
//     return (
//       <td {...restProps}>
//         {editable ? (
//           <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
//         ) : (
//             children
//           )}
//       </td>
//     );
//   }
// }

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         title: 'name',
//         dataIndex: 'name',
//         width: '30%',
//         editable: true,
//       },
//       {
//         title: 'age',
//         dataIndex: 'age',
//       },
//       {
//         title: 'address',
//         dataIndex: 'address',
//       },
//       {
//         title: 'operation',
//         dataIndex: 'operation',
//         render: (text, record) =>
//           this.state.dataSource.length >= 1 ? (
//             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//               <a>Delete</a>
//             </Popconfirm>
//           ) : null,
//       },
//     ];

//     this.state = {
//       dataSource: [
//         {
//           key: '0',
//           name: 'Edward King 0',
//           age: '32',
//           address: 'London, Park Lane no. 0',
//         },
//         {
//           key: '1',
//           name: 'Edward King 1',
//           age: '32',
//           address: 'London, Park Lane no. 1',
//         },
//       ],
//       count: 2,
//     };
//   }

//   handleDelete = key => {
//     const dataSource = [...this.state.dataSource];
//     this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
//   };

//   handleAdd = () => {
//     const { count, dataSource } = this.state;
//     const newData = {
//       key: count,
//       name: `Edward King ${count}`,
//       age: 32,
//       address: `London, Park Lane no. ${count}`,
//     };
//     this.setState({
//       dataSource: [...dataSource, newData],
//       count: count + 1,
//     });
//   };

//   handleSave = row => {
//     const newData = [...this.state.dataSource];
//     const index = newData.findIndex(item => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     this.setState({ dataSource: newData });
//   };

//   render() {
//     const { dataSource } = this.state;
//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell,
//       },
//     };
//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           editable: col.editable,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           handleSave: this.handleSave,
//         }),
//       };
//     });
//     return (
//       <div>
//         <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
//           Add a row
//         </Button>
//         <Table
//           components={components}
//           rowClassName={() => 'editable-row'}
//           bordered
//           dataSource={dataSource}
//           columns={columns}
//         />
//       </div>
//     );
//   }
// }


// export default EditableTable;