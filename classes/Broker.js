'use strict';
const superagent = require('superagent');
const querystring = require('querystring');

class Broker {

  constructor(req) {
    this.request = req;
    this.giphyAPIKey = process.env.GIPHY_API_KEY;
    this.completeArray = [];
  }

  async fetchPictures(rData){
    for (let i = 0; i < rData.recipes.length; i++) {
      let recipeName = querystring.escape(rData.recipes[i].title);
      let requAddr = 'https://api.giphy.com/v1/gifs/search?api_key=';
      requAddr += this.giphyAPIKey + '&q=' + recipeName;
      requAddr += '&limit=1&offset=0&rating=g&lang=en';
      try {
        let resp = await superagent.get(requAddr);
        resp = JSON.parse(resp.text);
        rData.recipes[i].gif = resp.data[0].images.original.url;
        rData.recipes[i].link = rData.recipes[i].href;
        rData.recipes[i].ingredients = rData.recipes[i].ingredients.split(',');
        delete rData.recipes[i].href;
        delete rData.recipes[i].thumbnail;
      } catch (err) {
        console.log(err.status);
        throw new Error('Error in Giphy API');
      }
    }
    return rData;
  }

  async fetchRecipes(ingredients){
    const ingredientsString = ingredients.join(',');
    const reqAddr = 'http://www.recipepuppy.com/api/?i=' + ingredientsString;
    try {
      let res = await superagent.get(reqAddr);
      let rData = JSON.parse(res.text);
      rData.keywords = ingredients;
      rData.recipes = rData.results;

      delete rData.title;
      delete rData.version;
      delete rData.href;
      delete rData.results;
      this.completeArray = await this.fetchPictures(rData);
      return this.completeArray;
    } catch (err) {
      console.log(err.status);
      throw new Error('Error in recipe puppy API');
    }
  }

  async run() {
    // var recipeList = null;
    if (this.request.query.i == null) throw new Error('Undefined parameters');
    const ingredients = this.request.query.i.split(',');
    let result = await this.fetchRecipes(ingredients);
    return result;
  }


}

module.exports = Broker;
