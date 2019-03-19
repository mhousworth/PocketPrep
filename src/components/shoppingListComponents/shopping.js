import React from 'react';
import { View, Text, ScrollView  } from 'react-native';
import { Header,ListItem } from 'react-native-elements'
import shoppingList from "../../data/shopping-list"
import recipeDb from "../../data/recipe"

class ShoppingListScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      ingredients:shoppingList
    }
  }
  render() {
    this.state.ingredients=(this.createShoppingList(["School's Out Scalloped Potatoes", "Lentil Vegetable Soup", "Healthy Breakfast Muffins"]));
      return (
        <View>
          {}
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

    createShoppingList(mealname) {
      var ing_array = [];
      for (n = 0; n < mealname.length; n++ ) {
        for (i = 0; i < recipeDb.length; i++) {
          if (recipeDb[i].name == mealname[n]) {
            var tempname = "Ingredients for " + mealname[n];
            ing_array.push(tempname);
            for (j = 0; j < recipeDb[i].ingredients.length; j++) {
              var temp = "";
                if (recipeDb[i].ingredients[j].measurement == "") {
                  temp += recipeDb[i].ingredients[j].name;
                } else {
                  temp += recipeDb[i].ingredients[j].name + recipeDb[i].ingredients[j].amount + " " + recipeDb[i].ingredients[j].measurement;
                }
                ing_array.push(temp);
          }
          ing_array.push("");
          break;
        }
      }
    }
    return ing_array;
   }
  }
  export default ShoppingListScreen;