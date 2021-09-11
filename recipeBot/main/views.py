from django.http.response import HttpResponseRedirect
from django.shortcuts import render
import requests, json, os
from rest_framework import viewsets

# class IndexView(viewsets.ModelViewSet):


# Create your views here.
def index(response):
    recipeApi = '53402d637f4345cb83aac523d64ec275'
    recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + recipeApi
    result = ''
    if response.method == "POST":
        cuisine = '&cuisine=' + response.POST.get('cuisine')
        recipeAddress = recipeAddress + cuisine
        r = requests.get(recipeAddress)
        j = json.loads(r.text)

        result = j.get('results')[0].get('title')
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
def calculateCaloricIntakeImperial(request, gender, weight, feet, inches, age, activityLevel):
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
def calculateCaloricIntakeMetric(request, gender, weight, height, age, activityLevel):
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
