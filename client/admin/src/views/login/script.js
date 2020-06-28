import { add, login } from '@/api/user';
import Aes from '@/utils/aes';
import storage from '@/utils/storage';

const passKey = 'password';
const nameKey = 'name';

export default {
  data () {
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: storage.get(nameKey),
        pass: Aes.decrypt(storage.get(passKey)),
        checkPass: '',
      },
      type: '1',
      isRemember: Boolean(storage.get('isRemember')),
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  computed: {
    isLogin () {
      return this.type === '1';
    }
  },
  watch: {
    isRemember (val) {
      storage.set('isRemember', val);
      if (val) { 
        this.storagePass(val);
        this.storageName(val);
      } else {
        storage.del(passKey);
        storage.del(nameKey);
      }
    },
    'ruleForm.name'(val) {
      if (this.isRemember) {
        this.storageName(val);
      }
    },
    'ruleForm.pass'(val) {
      if (this.isRemember) {
        this.storagePass(val);
      } 
    }
  },
  methods: {
    storageName() {
      storage.set(nameKey, this.ruleForm.name);
    },
    storagePass() {
      storage.set(passKey, Aes.encrypt(this.ruleForm.pass));
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            name: this.ruleForm.name,
            password: this.ruleForm.pass
          }
          alert('submit!');
          if (this.isLogin) {
            login(data).then(res => {
              this.handleLoginOrAdd(res)
            });
          } else {
            add(data).then(res => {
              this.handleLoginOrAdd(res)
            });;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleLoginOrAdd (res) {
      const { code, data } = res;
      if (code === 0) {
        const { token, name } = data;
        this.$store.mutations.SET_TOKEN(token);
        this.$store.mutations.SET_USER_INFO({ name });
        this.$router.push('/product_list');
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
