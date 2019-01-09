# All the News That's Fit to Scrape

The app is deployed on Heroku: https://scraper-heroku18.herokuapp.com/  

## Overview

In this assignment, a web app is created that lets users view and leave comments on the latest news.  Mongoose and Cheerio are used to scrape news from another site.

## Instructions

* Create an app that accomplishes the following:

  1. Whenever a user visits the site, the app should scrape stories from a news outlet and displays them for the user. Each scraped article should be saved to the application’s database. The app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

