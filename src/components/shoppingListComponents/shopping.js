import React from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Header,ListItem } from 'react-native-elements'
import shoppingList from "../../data/shopping-list"
import recipeDb from "../../data/recipe"

class ShoppingListScreen extends React.Component {
  constructor(props){
    super(props);

    // Ingredients holds all ingredients of selected meals
    this.state={
      ingredients:[]
    }
  }
  render() {
    
    this.state.ingredients=(this.createShoppingList(["School's Out Scalloped Potatoes", "Lentil Vegetable Soup", "Healthy Breakfast Muffins"]));
      return (
        <View>
            <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            />
        
            <ScrollView >
                {
                    this.state.ingredients.map((item,i) => (
                    <ListItem
                        key={i}
                        title={item}
                    />
                    ))
                }
            </ScrollView>
        </View>
      );
    }
    // Pulls ingredients with name of the meal
    // createShoppingList -- Input: Array of meal names
    //                       Output: Array of ingredients of each meal
    createShoppingList(mealNames) {
      let shoppingList = [];
      for (let mealNameIndex = 0; mealNameIndex < mealNames.length; mealNameIndex++ ) {
        for (let recipeIndex = 0; recipeIndex < recipeDb.length; recipeIndex++) {
          if (recipeDb[recipeIndex].name == mealNames[mealNameIndex]) {
            let tempname = "Ingredients for " + mealNames[mealNameIndex];
            shoppingList.push(tempname);
            for (ingredientIndex = 0; ingredientIndex < recipeDb[recipeIndex].ingredients.length; ingredientIndex++) {
              let temp = "";
                if (recipeDb[recipeIndex].ingredients[ingredientIndex].measurement == "") {
                  temp += recipeDb[recipeIndex].ingredients[ingredientIndex].name;
                } else {
                  temp += recipeDb[recipeIndex].ingredients[ingredientIndex].name + recipeDb[recipeIndex].ingredients[ingredientIndex].amount + " " + recipeDb[recipeIndex].ingredients[ingredientIndex].measurement;
                }
                shoppingList.push(temp);
          }
          shoppingList.push("");
          break;
        }
      }
    }
    return shoppingList;
   }
  }
  export default ShoppingListScreen;