from django.shortcuts import render
import requests, json, os

# Create your views here.
def index(response):
    recipeApi = '53402d637f4345cb83aac523d64ec275'
    recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + recipeApi


    if response.method == "POST":
        cuisine = '&cuisine=' + response.POST.get('cuisine')
        recipeAddress = recipeAddress + cuisine
        r = requests.get(recipeAddress)
        j = json.loads(r.text)
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

    return render(response, 'main/index.html', {'info':j})

def calculateBMImetric(request ,height:int, weight:int):
    BMI = (weight / height / height) * 10000
    return BMI


def calculateBMIimperial(request,feet:int, inches:int, weight:int):
    inchConversion = (12 * feet) + inches
    BMI = ((weight * 703) / (inchConversion ** 2))
    return BMI
