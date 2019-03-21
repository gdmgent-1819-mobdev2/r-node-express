class Technology {
    id;
    name;
    description;

    constructor(name) {
        this.name = name;
    }

    get fullInfo() {
        return `${this.name}: ${this.name}`
    }
}

export default Technology;