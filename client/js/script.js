var app = new Vue({
    el: '#userapp',
    data: {
        stye: {
            modalregis: false,
            modallogin: false
        },
        register: {
            name: '',
            email: '',
            password: ''
        },
        login: {
            email: '',
            password: ''
        }
    },
    mounted() {
        //  this.loaddata() //method1 will execute at pageload
    },
    computed: {},
    methods: {
        loaddata: function() {
            let thisapp = this;
            let loaddata1 = new Promise(function(res, rej) {
                axios.get('http://localhost:3000/api/memo')
                    .then(function(data) {
                        res(data);
                    })
                    .catch(function(err) {
                        rej(err)
                    })
            });
            loaddata1.then(function(data) {
                thisapp.memos = data.data;
            })
        },
        postregister(){
          console.log('lalal');
          let thisapp = this;
          axios.post('http://localhost:3000/api/user', {
                  name: thisapp.register.name,
                  email: thisapp.register.email,
                  password: thisapp.register.password
              })
              .then(function(response) {
                  console.log(response.data);
                  thisapp.modalregisoff()
                  alert(response.data)
                  thisapp.register.name = '',
                  thisapp.register.email = '',
                  thisapp.register.password = ''
              })
              .catch(function(error) {
                  console.log(error);
              });
        },
        postlogin(){
          let thisapp = this;
          axios.post('http://localhost:3000/api/login',{
            email:thisapp.login.email,
            password:thisapp.login.password
          }).then(function(response){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('user',response.data.user)
            window.location.pathname = "./user.html";
            alert('login succes')
          }).catch(function(err){
            alert(err);
          })

        },
        modalregison() {
            console.log('adaada');
            this.stye.modalregis = true
        },
        modalregisoff() {
            console.log('adaada');
            this.stye.modalregis = false
        },
        modalloginon() {
            console.log('adaada');
            this.stye.modallogin = true
        },
        modalloginoff() {
            console.log('adaada');
            this.stye.modallogin = false
        }



    }


})
