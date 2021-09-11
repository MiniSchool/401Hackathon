from django.shortcuts import render
import requests, json, os


# Create your views here.
def index(response):
    recipeApi = '53402d637f4345cb83aac523d64ec275'

    
    recipeAddress = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + recipeApi
    
    r = requests.get(recipeAddress)
    j = json.loads(r.text)

    print(j)

    return render(response, 'main/index.html', {'info':j})