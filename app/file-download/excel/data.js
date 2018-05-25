const columns = [
  {
    id: 1,
    label: '姓名',
    field: 'name',
    type: 'string'
  },
  {
    id: 2,
    label: '年龄',
    field: 'age',
type: 'number'

  },
  {
    id: 3,
    label: '工作',
    field: 'work',
    type: 'string'
  },
  {
    id: 4,
    label: '性别',
    field: 'gender',
    type: 'string'
  }
]

const data = [
  {
    id: '001',
    name: '张小小',
    age: '20',
    work: 'IT',
    gender: '男'
  },

  {
    id: '002',
    name: '张小小22',
    age: '50',
    work: '酒店',
    gender: '女'
  },

  {
    id: '003',
    name: '刘小小',
    age: '20',
    work: '程序员',
    gender: '女'
  },

  {
    id: '004',
    name: '张小小',
    age: '40',
    work: '自由工作者',
    gender: '女'
  },

  {
    id: '005',
    name: '刘红红',
    age: '40',
    work: '自由工作者',
    gender: '女'
  }
]

module.exports = { columns, data}
