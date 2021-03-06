from django.http.response import HttpResponseRedirect
from django.shortcuts import render
import requests, json, os
from rest_framework import viewsets
from django.views.generic.base import TemplateView
# from articles.models import Article

class HomePageView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        kwargs = super(HomePageView, self).get_context_data(**kwargs)
        # Your code here
        kwargs['foo'] = "bar"
        return kwargs

    def post(self, request, *args, **kwargs):
        recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=53402d637f4345cb83aac523d64ec275'
        context = self.get_context_data(**kwargs)
        data = json.loads(request.body)
        print(data)
        # Your code here
        # Here request.POST is the same as self.request.POST
        # You can also access all possible self variables
        # like changing the template name for instance
        # bar = self.request.POST.get('foo', None)
        # if bar: self.template_name = 'path-to-new-template.html'
        # previous_foo = context['foo']
        context['new_variable'] = 'new_variable' + ' updated'
        
        return self.render_to_response(context)
    
    # formulas found in https://drbillsukala.com/body-mass-index-calculator/#:~:text=BMI%20imperial%20formula&text=The%20US%20imperial%20formula%20for,in%20inches%20(height%20squared).
    def calculateBmiMetric(self ,request ,height:int, weight:int):
        BMI = (weight / height / height) * 10000
        return BMI


    def calculateBmiImperial(self ,request,feet:int, inches:int, weight:int):
        inchConversion = (12 * feet) + inches
        BMI = ((weight * 703) / (inchConversion ** 2))
        return BMI

    # formulas found in https://www.checkyourhealth.org/eat-healthy/cal_calculator.php
    def calculateCaloricIntakeImperial(self ,request ,gender , weight ,feet ,inches ,age ,activityLevel):
        activityLevelClassification = {"S": "Sedentary", "LA" : "Lightly Active", "MA" : "Moderately Active", "VA": "Very Active", "EA" : "Extra Active"}
        inchConversion = (12 * feet) + inches
        if gender == 'M':
            BMR = 66 + (6.3 * weight) + (12.9 * inchConversion) - (6.8 * age)
        elif gender == 'F':
            BMR = 655 + (4.3 * weight) + (4.7 * inchConversion) - (4.7 * age)
    
        if activityLevel == 'S':
            calories = BMR * 1.2
        elif activityLevel == 'LA':
            calories = BMR * 1.375
        elif activityLevel == 'MA':
            calories = BMR * 1.55 
        elif activityLevel == 'VA':
            calories = BMR * 1.725
        elif activityLevel == 'EA':
            calories = BMR * 1.9

        return calories

    #formula found in https://www.verywellfit.com/how-many-calories-do-i-need-each-day-2506873
    def calculateCaloricIntakeMetric(self, request, gender, weight, height, age, activityLevel):
        activityLevelClassification = {"S": "Sedentary", "LA" : "Lightly Active", "MA" : "Moderately Active", "VA": "Very Active", "EA" : "Extra Active"}
        if gender == 'M':
            BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
        elif gender == 'F':
            BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    
        if activityLevel == 'S':
            calories = BMR * 1.2
        elif activityLevel == 'LA':
            calories = BMR * 1.375
        elif activityLevel == 'MA':
            calories = BMR * 1.55 
        elif activityLevel == 'VA':
            calories = BMR * 1.725
        elif activityLevel == 'EA':
            calories = BMR * 1.9
        return calories

    # ratios can be found here: https://www.acefitness.org/education-and-resources/professional/expert-articles/5904/how-to-determine-the-best-macronutrient-ratio-for-your-goals/
    def caloricToMacros(self ,request ,calories, goal):
        macroGoalClassification = {"LW": "Lose Weight", "GW": "Gain Weight", "MW": "Maintain Weight"}
        macros = []
        if goal == "LW":
            carbs = (0.5 * calories) / 4
            protein = (0.2 * calories) / 4
            fat = (0.3 * calories) / 9
        elif goal == "GW":
            carbs = (0.55 * calories) / 4
            protein = (0.25 * calories) / 4
            fat = (0.2 * calories) / 9
        elif goal == "MW":
            carbs = (0.45 * calories) / 4
            protein = (0.3 * calories) / 4
            fat = (0.25 * calories) / 9
        carbs = int(carbs)
        fat = int(fat)
        protein = int(protein) 
        macros = [str(carbs) + "g", str(protein) + "g", str(fat) + "g"]
        return macros



    # class IndexView(viewsets.ModelViewSet):


# Create your views here.
def index(response):
    recipeApi = '53402d637f4345cb83aac523d64ec275'
    recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=53402d637f4345cb83aac523d64ec275'
    result = []
    if response.method == "POST":
        print('test')
        print(response.POST.get('firstName'))
        # age = int(response.POST.get('ageInput'))
        # gender = response.POST.get('genderInput')[0].upper()
        # weight = int(response.POST.get('weightInput'))
        # height = int(response.POST.get('heightInput'))
        # activityLevel = response.POST.get('activityInput')
        # goal = response.POST.get('goalInput')

        # calories = calculateCaloricIntakeMetric(gender, weight, height, age, activityLevel)

        # macros = caloricToMacros(calories, goal)

        # protein = '&minProtein=' + str(int(macros[1][:1])/4)
        # recipeAddress = recipeAddress + protein
        r = requests.get(recipeAddress)
        j = json.loads(r.text)

        print(j)

        # result['title'] = j.get('results')[0].get('title')
        # print(filter)

    # filters = '&minProtein = 30'

    # cuisine = '&cuisine = italian'

    # diet = '&diet = vegetarian'
    
    # recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + recipeApi + filters

    # recipeTaste = 'https://api.spoonacular.com/recipes/69095/tasteWidget?apiKey=' + recipeApi

    # recipeDesc = 'https://api.spoonacular.com/recipes/{id}/summary'
    
    # r = requests.get(recipeAddress)
    # j = json.loads(r.text)

    # print(j)

    return render(response, 'main/index.html', {'info':result})

# formulas found in https://drbillsukala.com/body-mass-index-calculator/#:~:text=BMI%20imperial%20formula&text=The%20US%20imperial%20formula%20for,in%20inches%20(height%20squared).
def calculateBmiMetric(request ,height:int, weight:int):
    BMI = (weight / height / height) * 10000
    return BMI


def calculateBmiImperial(request,feet:int, inches:int, weight:int):
    inchConversion = (12 * feet) + inches
    BMI = ((weight * 703) / (inchConversion ** 2))
    return BMI

# formulas found in https://www.checkyourhealth.org/eat-healthy/cal_calculator.php
def calculateCaloricIntakeImperial(gender, weight, feet, inches, age, activityLevel):
    activityLevelClassification = {"S": "Sedentary", "LA" : "Lightly Active", "MA" : "Moderately Active", "VA": "Very Active", "EA" : "Extra Active"}
    inchConversion = (12 * feet) + inches
    if gender == 'M':
        BMR = 66 + (6.3 * weight) + (12.9 * inchConversion) - (6.8 * age)
    elif gender == 'F':
        BMR = 655 + (4.3 * weight) + (4.7 * inchConversion) - (4.7 * age)
    else:
        print("Gender not specified, try again!")
  
    if activityLevel == 'S':
        calories = BMR * 1.2
    elif activityLevel == 'LA':
        calories = BMR * 1.375
    elif activityLevel == 'MA':
        calories = BMR * 1.55 
    elif activityLevel == 'VA':
        calories = BMR * 1.725
    elif activityLevel == 'EA':
        calories = BMR * 1.9
    else:
        print("activity level not specified, try again!")

    return calories

#formula found in https://www.verywellfit.com/how-many-calories-do-i-need-each-day-2506873
def calculateCaloricIntakeMetric(gender, weight, height, age, activityLevel):
    activityLevelClassification = {"S": "Sedentary", "LA" : "Lightly Active", "MA" : "Moderately Active", "VA": "Very Active", "EA" : "Extra Active"}
    if gender == 'M':
        BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
    elif gender == 'F':
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    else:
        print("Gender not specified, try again!")
  
    if activityLevel == 'S':
        calories = BMR * 1.2
    elif activityLevel == 'LA':
        calories = BMR * 1.375
    elif activityLevel == 'MA':
        calories = BMR * 1.55 
    elif activityLevel == 'VA':
        calories = BMR * 1.725
    elif activityLevel == 'EA':
        calories = BMR * 1.9
    else:
        print("activity level not specified, try again!")
    return calories

# ratios can be found here: https://www.acefitness.org/education-and-resources/professional/expert-articles/5904/how-to-determine-the-best-macronutrient-ratio-for-your-goals/
def caloricToMacros(request ,calories, goal):
    macroGoalClassification = {"LW": "Lose Weight", "GW": "Gain Weight", "MW": "Maintain Weight"}
    macros = []
    if goal == "LW":
        carbs = (0.5 * calories) / 4
        protein = (0.2 * calories) / 4
        fat = (0.3 * calories) / 9
    elif goal == "GW":
        carbs = (0.55 * calories) / 4
        protein = (0.25 * calories) / 4
        fat = (0.2 * calories) / 9
    elif goal == "MW":
        carbs = (0.45 * calories) / 4
        protein = (0.3 * calories) / 4
        fat = (0.25 * calories) / 9
    carbs = int(carbs)
    fat = int(fat)
    protein = int(protein) 
    macros = [str(carbs) + "g", str(protein) + "g", str(fat) + "g"]
    return macros
