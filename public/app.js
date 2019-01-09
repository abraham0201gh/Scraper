// Grab the articles as a JSON

// Home link is clicked
$(document).on("click", "#homeLink", function() {
  $("#articles").empty();
  // Grab the id associated with the article from the submit button
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Create Div to append scraped information
      // Display the information on the page
      $("#articles").append("<div class='card'>" + "<p data-id='" + data[i]._id + "'>" + "<h5>" + data[i].title + "</h5>" + data[i].summary + "<br />" + "<br />" + "<a href='https://www.nytimes.com" + data[i].link + "'>" + data[i].link + "</a>" + "</p>" + "<p><a class='btn btn-warning btn-sm' type='button' id='saveArticle' data-id='" + data[i]._id + "'>" + "Save Article</a></p>" + "<br />" + "</div>");
    }
  });
});


// When the Scrape button is clicked
$(document).on("click", "#scrapeBtn", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then (function(data) {
      console.log(data);
      location.reload();
  });

  $("#articles").empty();

});

// Grab the articles as JSON
$.getJSON("/articles", function(data) {
  // For each one

  for (var i = 0; i < data.length; i++) {
    // Create Div to append scraped information
    // Display the information on the page
    $("#articles").append("<div class='card'>" + "<p data-id='" + data[i]._id + "'>" + "<h5>" + data[i].title + "</h5>" + data[i].summary + "<br />" + "<br />" + "<a href='https://www.nytimes.com" + data[i].link + "'>" + data[i].link + "</a>" + "</p>" + "<p><a class='btn btn-warning btn-sm' type='button' id='saveArticle'>Save Article</a></p>" + "<br />" + "</div>");
  }
});


// When the Clear Articles button is clicked, all articles are cleared from the scrape page
$(document).on("click", "#clearBtn", function() {
  // Empty the notes from the note section
  $("#articles").empty();
  $("#articles").append("No Articles Currently Available.  To View News Articles, Click The Scrape Button Or The Saved Articles Link.");
});

// Saved Articles link is clicked
$(document).on("click", "#savedLink", function() {
  $("#articles").empty();
  // $("#articles").append("No Articles Currently Available.  To View News Articles, Click The Scrape Button Or The Saved Articles Link.");
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // Clear out text area
      $("#notes").empty();

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      // console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


// When you click the saveArticle button
$(document).on("click", "#saveArticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // POST request to the server to save article in database
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Creating new field, corresponds to new saved articles
      save: true
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
  })