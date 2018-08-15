export class SubcatTemplate {
    constructor() {
        this.title = "";
        this.link = "";
        this.desc = "",
        this.prods = {};
    }
}
export class CardTemplate {
    constructor() {
        this.title = "";
        this.link = "";
        this.article = "";
        this.priceType = "";
        this.prodClass = "";
        this.attributes = {};
        this.images = [];
        this.primaryProps = {};
        this.infoBlock = {
            props : {},
            desc : "",
            advantages : [],
            appAreas : "",
            video: ""
        }
    }
}