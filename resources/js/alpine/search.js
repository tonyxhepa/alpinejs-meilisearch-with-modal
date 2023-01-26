import MeiliSearch from "meilisearch";

export default function () {
    return {
        modalOpen: false,
        query: "",
        index: null,
        results: null,
        selectedHitIndex: 0,

        init() {
            const client = new MeiliSearch({ host: "http://localhost:7700" });
            this.index = client.index("articles");
            this.watchQuery();
        },
        watchQuery() {
            this.$watch("query", (query) => {
                if (query === "") {
                    this.results = null;
                    return;
                }
                this.search(query);
            });
        },
        async search(query) {
            this.results = await this.index.search(query, { limit: 10 });
            this.selectedHitIndex = 0;
        },
        reset() {
            this.results = null;
            this.query = "";
            this.modalOpen = false;
        },
        focusPreviousResult() {
            if (this.selectedHitIndex === 0) {
                this.selectedHitIndex = this.results.hits.length - 1;
            } else {
                this.selectedHitIndex--;
            }
        },
        focusNextResult() {
            if (this.selectedHitIndex < this.results.hits.length - 1) {
                this.selectedHitIndex++;
            } else {
                this.selectedHitIndex = 0;
            }
        },
        onHitEnter() {
            const hit = this.results.hits[this.selectedHitIndex];
            window.location = `/articles/${hit.id}`;
            this.reset();
        },
    };
}
