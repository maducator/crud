Vue.createApp({
    data() {
        return {
            get: {
                page: 1,
                rows: 10,
            },
            title: '<b>Blog</b>',
            contents: '<b>this is Blog</b>',
            index: {
                total: 0,
                list: [],
            },
            post: {
                title: "",
                contents: "",
            }
        };
    },
    mounted() {
        this.list();
    },
    methods: {
        list() {
            $.get('/blog/', this.get)
            .done( res => {
                this.index = res;
                console.log(res);
                this.index.list.forEach( row => row.created = row.created.substring(0,10));
            });
        },
        save() {
            $.post('/blog/save', this.post)
            .done( res => {
                this.post = { title: '', contents: '' };
                this.list();
            });
        },
        edit(row) {
            this.post = row;
        },
        remove( id ) {
            $.get('/blog/delete', { id: id })
            .done( res => { this.list() });
        }
    },
    components: { pagination: m.pagination }
}).mount('#app');