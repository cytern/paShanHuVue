export default{
    name: [
        { required: true, message: "请输入名称", trigger: "blur" },
        { min: 3, max: 20, message: "长度至少为3", trigger: "blur" },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 6, max: 50, message: '至少长度为8！', trigger: 'blur' },
              {
                   required: true,
                   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                   message: '至少八个字符，至少一个字母和一个数字：',
                   trigger: 'blur'
              }
      ],
      num: [
        { required: true, message: '请输入数字', trigger: 'blur' },
              {
                   required: true,
                   pattern: /^[0-9]*$/,
                   message: '只能输入数字',
                   trigger: 'blur'
              }
      ],

      date1: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
      ],
      date2: [
        {
          type: "date",
          required: true,
          message: "请选择时间",
          trigger: "change",
        },
      ],
      type: [
        {
          type: "array",
          required: true,
          message: "请至少选择一个活动性质",
          trigger: "change",
        },
      ],
    
    
}