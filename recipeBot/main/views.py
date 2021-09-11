from django.shortcuts import render

# Create your views here.
def index(response):
    recipeApi = '53402d637f4345cb83aac523d64ec275'

    #https://api.spoonacular.com/recipes/complexSearch