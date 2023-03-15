import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesSerivce {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3000');
  }

  async listCategories() {
    const categories = await this.httpClient.get(`/categories`);

    return categories.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesSerivce();
