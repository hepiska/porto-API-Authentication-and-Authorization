var app = new Vue({
    el: '#usershow',
    data: {
        users:[]
    },
    mounted() {
        this.loaddata() //method1 will execute at pageload
        this.cektoken()
    },
    computed: {},
    methods: {
        loaddata: function() {
            let thisapp = this;
            let loaddata1 = new Promise(function(res, rej) {
                axios.get('http://localhost:3000/api/user')
                    .then(function(data) {
                        res(data);
                    })
                    .catch(function(err) {
                        rej(err)
                    })
            });
            loaddata1.then(function(data) {
                thisapp.users = data.data;
            })
        },
        cektoken(){
          if (!localStorage.getItem('token')) {
             window.location.pathname = "./index.html";
          }
        },
        logout(){
          localStorage.clear();
          this.cektoken()
        }

    }


})
