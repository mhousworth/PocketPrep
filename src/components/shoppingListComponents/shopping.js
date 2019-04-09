import React from 'react';
import { View, Text, ScrollView,StyleSheet  } from 'react-native';
import { Header,ListItem,CheckBox } from 'react-native-elements'
import shoppingList from "../../data/shopping-list"
import recipeDb from "../../data/recipe"

class ShoppingListScreen extends React.Component {
  constructor(props){
    super(props);

    // Ingredients holds all ingredients of selected meals
    this.state={
      ingredients:[]
    }
    this.styles = StyleSheet.create({
      isChecked:{
        backgroundColor:'#90ee90'
      },
      notChecked:{
        backgroundColor:'#FFFFFF'
      }
    })
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
                    this.state.ingredients.map((item) => (
                    <ListItem
                        key={item["index"]}
                        title={item["ingredient"]}
                        checkBox={{checked:item["isChecked"]}}
                        onPress={() => {
                          item["isChecked"]=!item["isChecked"];
                        }}
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
            shoppingList.push({ingredient:tempname,isChecked:false,index:shoppingList.length});
            for (ingredientIndex = 0; ingredientIndex < recipeDb[recipeIndex].ingredients.length; ingredientIndex++) {
              let temp = "";
                if (recipeDb[recipeIndex].ingredients[ingredientIndex].measurement == "") {
                  temp += recipeDb[recipeIndex].ingredients[ingredientIndex].name;
                } else {
                  temp += recipeDb[recipeIndex].ingredients[ingredientIndex].name + recipeDb[recipeIndex].ingredients[ingredientIndex].amount + " " + recipeDb[recipeIndex].ingredients[ingredientIndex].measurement;
                }
                shoppingList.push({ingredient:temp,isChecked:false,index:shoppingList.length});
          }
          shoppingList.push("");
          break;
        }
      }
    }
    return shoppingList;
   }

   // Highlights List Item on user click
   // lightgreen (#90ee90)
   checkIngredients(id){
     shoppingList[id]["isChecked"] = !shoppingList[id]["isChecked"];
    

   }
   
  }
  export default ShoppingListScreen;