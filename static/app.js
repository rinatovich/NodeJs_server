
const App = {
    data(){
        return{
            servers: [],
            name: ''
        }
    },
    methods: {
        async createUser(){
            const data ={
                name: this.name,
                status: 'created'
            }
             const res = await fetch('/api/server', {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(data)
            })
            this.name ='';
            const newUser = await res.json();
            this.servers.push(newUser);
        },
        async remove(id){
            await fetch(`api/server/${id}`,{method: 'DELETE'});
            this.servers = this.servers.filter(s => s.id !== id);
        }

    },
    async mounted() {
        const res = await fetch('/api/server');
        this.servers = await res.json();
    }
}
Vue.createApp(App).mount('#app');