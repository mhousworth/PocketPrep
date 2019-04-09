import { FileSystem } from 'expo';

class MealPlan {
		constructor(){
			//Arrays for each "meal time", holds strings of meal names
			this.Breakfast = [];
			this.Lunch = [];
			this.Dinner = [];
		}

		//Add name of meal to appropriate "meal time"
		add(t,m) {
			if (t == 'B')
				this.Breakfast.push(m);
			else if (t == 'L')
				this.Lunch.push(m);
			else if (t == 'D')
				this.Dinner.push(m);
		}
		
		//Remove a meal with a matching name from an appropriate "meal time"
		remove(t,m) {
			//Temp array
			arr = [];
			
			//Copy array based on time of meal 't'
			if (t == 'B')
				arr = this.Breakfast;
			else if (t == 'L')
				arr = this.Lunch;
			else if (t == 'D')
				arr = this.Dinner;
			
			//Search for matching entry
			i = 0;
			while(arr[i] != m && i < arr.length)
				i++;
			
			//Check if loop finished without finding matching entry
			if(arr[i] != m)
				return false;
			
			if(i == 0)
				//if first entry is a match we can shift to remove
				arr.shift();
			else if(i == arr.length-1)
				//if last entry is a match we can pop to remove
				arr.pop();
			else {
				//Slice a left and right array, leaving out the matched entry
				let left = arr.slice(0, i);
				let right = arr.slice(i+1, arr.length);
				//Concat into new array
				arr = left.concat(right);
			}
			
			//Copy new array into original previously copied.
			if (t == 'B')
				this.Breakfast = arr;
			else if (t == 'L')
				this.Lunch = arr;
			else if (t == 'D')
				this.Dinner = arr;
			
			//Found and removed entry, return true
			return true;
		}
}

export default class MealManager {
	
	constructor(){
	
        //Get/create filepath
        
		this.fileUri = FileSystem.documentDirectory + 'mealplan.json';
		if ( FileSystem.getInfoAsync(this.fileUri).exists == true) {
			console.log('mealplan file exists');
			
			//FileSystem reads are asynchronous, must await before creating MealPlanCalendar object
			fileread = async () => {
				let result = null;
			
				try {
					//Wait for FileSystem read to return a result string
					result = await FileSystem.readAsStringAsync(this.fileUri);
				
				} catch(e) {
				console.log(e);
				}
				//Parse result to object and store in MealPlanCalendar
				this.MealPlanCalendar = JSON.parse(result);
			}
			//Run async function
			fileread();
		}
		else {
			console.log('mealplan file does not exist');
			//create the file based on app's asset
			this.MealPlanCalendar = "{}";
            FileSystem.writeAsStringAsync(this.fileUri, this.MealPlanCalendar);
            this.MealPlanCalendar = {};
		}
	}
	
	//get mealplan object from MealPlanCalendar
	//Parameter: date associated with mealplan
	getMealPlan(d){	
		return this.MealPlanCalendar[d];
	}


	//add/append mealplan within MealPlanCalendar
	//Parameters: d = date (XXXX-XX-XX), t = time of meal ('B' 'L' or 'D'), m = name of meal/recipe
	addmeal(d, t, m) {
	
	//Create mealplan object
	let mp = new MealPlan();
	
		//if there is not an existing mealplan
		if( this.MealPlanCalendar[d] == null ) {
			
			//Add to meal plan according to Breakfast, Lunch, or Dinner
			mp.add(t,m);
			
			//append mealplan to MealPlanCalendar
			this.MealPlanCalendar[d] = mp;
		}
		else {
			//Retrieve mealplan from calendar
			mp = this.MealPlanCalendar[d];
			
			//add the meal to mealplan object
			mp.add(t,m);
			
			//append meal in MealPlanCalendar
			this.MealPlanCalendar[d] = mp;
		}
		
		//Writes Object/Data_structure to file
		FileSystem.writeAsStringAsync(this.fileUri, JSON.stringify(this.MealPlanCalendar));
		
		//Output for debug/testing purposes
		console.log("added " + m);
		
		return;
	}
	
	//Testing Purposes
	printFile() {
		FileSystem.readAsStringAsync(this.fileUri).then( (filedata) => {console.log(filedata)});
	}
}
