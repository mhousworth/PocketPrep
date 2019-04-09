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
      for (let n = 0; n < mealNames.length; n++ ) {
        for (let i = 0; i < recipeDb.length; i++) {
          if (recipeDb[i].name == mealNames[n]) {
            let tempname = "Ingredients for " + mealNames[n];
            shoppingList.push(tempname);
            for (j = 0; j < recipeDb[i].ingredients.length; j++) {
              let temp = "";
                if (recipeDb[i].ingredients[j].measurement == "") {
                  temp += recipeDb[i].ingredients[j].name;
                } else {
                  temp += recipeDb[i].ingredients[j].name + recipeDb[i].ingredients[j].amount + " " + recipeDb[i].ingredients[j].measurement;
                }
                shoppingList.push(temp);
          }
          shoppingList.push("");
          break;
        }
      }
    }
    return ing_array;
   }
  }
  export default ShoppingListScreen;