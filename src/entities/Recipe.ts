export class Recipe {
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private created_at: string,
        private user_id: string
    ){}

    public getId(){
        return this.id
    }
    public getTitle(){
        return this.title
    }
    public getDescription(){
        return this.description
    }
    public getCreatedAt(){
        return this.created_at
    }
    public getUserId(){
        return this.user_id
    }

    static toUserModel(data: any): Recipe{
        return new Recipe(data.id, data.title, data.description, data.created_at, data.user_id)
    }
}