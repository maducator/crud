const m = {};
m.range = function(start, stop, step = 1) {
    return Array(Math.ceil((stop + 1 - start) / step)).fill(start).map((x, y) => x + y * step);
};

m.pagination = {
    data() {
        return {
            current: 1,
            start: 0,
            end: 0,
            prev: 0,
            next: 0,
            last: 1,
            pageRange: [],
        };
    },
    props: {
        page: { type: Number, default: 1 },
        search: { type: Object },
        total: { type: Number, default: 0 },
        rows: { type: Number, default: 10 },
        pages: { type: Number, default: 10 },
    },
    watch: {
        total() {
            this.update();
        },
        rows() {
            this.update();
        },
        page() {
            this.change(this.page);
        },
    },
    methods: {
        update() {
            let total = Number(this.total);
            let pages = this.pages;
            let last = Math.ceil( total / this.rows ) || 1;
            let end = Math.ceil( this.current / pages ) * pages;
            let start = end - pages + 1;
            end = (end > last) ? last : end;

            let prev = ( this.current > pages ) ? start - 1 : 0;
            let next = ( end < last ) ? start + pages : 0;

            this.start = start;
            this.end = end;
            this.prev = prev;
            this.next = next;
            this.last = last;
            this.pageRange = m.range(start, end);
        },
        change(page) {
            this.search.page = page;
            this.current = page;
            this.update();
            this.$emit('update');
        },
    },
    template: `
    <ul class="pagination justify-content-center">
        <li class="page-item"><a class="page-link" v-if="current != 1" @click.prevent="change(1)" href="?page=1" title="첫 페이지">&laquo;</a></li>
        <li class="page-item"><a class="page-link" v-if="prev" @click.prevent="change(prev)" :href="'?page=' + prev" title="이전 페이지">&lsaquo;</a></li>
        <li v-for="page in pageRange" class="page-item" :class="{ active: page == current }">
            <a class="page-link" @click.prevent="change(page)" :href="'?page=' + page" >{{ page }}</a>
        </li>
        <li class="page-item"><a class="page-link" v-if="next" @click.prevent="change(next)" :href="'?page=' + next" title="다음 페이지">&rsaquo;</a></li>
        <li class="page-item"><a class="page-link" v-if="current != last" @click.prevent="change(last)" :href="'?page=' + last" title="마지막 페이지">&raquo;</a></li>
    </ul>
    `
};