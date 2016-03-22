$(document).ready(function() {
  // when document is ready, load random quote, based on selected category
  var currentCategory = "all"; // this is the all categories option, and will be the default when page first loads
  var quoteText;
  var quoteAuthor;
  var fileJSON = "quotes.json";
  
  //this function loads a quote when the page loads
  function firstQuoteLoad () {
      randomCategory();
      randomQuote(currentCategory);
      updateBG(currentCategory);
  }
  firstQuoteLoad();
  // generates a random number and finds the applicable category
   function randomCategory() {
       // sets currentCategory
      var num = (Math.floor(Math.random() * (3 - 0 + 1)) + 0);
      
      switch (num) {
          case 0:
                currentCategory = "astronomy";
                break;
          case 1:
                currentCategory = "literature";
                break;
          case 2:
                currentCategory = "technology";
                break;
          case 3:
                currentCategory = "movies";
                break;                                
           
      } // switch end
   }
   function randomQuote(category) {
       
       
       //uses the currentCategory var and creates a random num to find specific quote
       $.getJSON(fileJSON, function(json) {
          var catLength = JSON.stringify(json[category].length);
          var index = (Math.floor(Math.random() * ((catLength-1) - 0 + 1)) + 0);
      
          quoteText = JSON.stringify(json[category][index].quote);
          quoteAuthor = JSON.stringify(json[category][index].author);
          // remove quote characters
          quoteText = quoteText.substring(1,quoteText.length-1);
          quoteAuthor = quoteAuthor.substring(1,quoteAuthor.length-1);
          updateQuoteDiv(quoteText, quoteAuthor);
        });
   }
   function updateQuoteDiv(text, author) {
       $("#quoteText").html('<i class="fa fa-quote-left"></i> ' + text + ' <i class="fa fa-quote-right"></i>');
       $("#quoteCite").html("&#8212 " + author);
       
       //update tweetbutton
       $("#tweet").attr("href", "http://twitter.com/home/?status="+ quoteText + "-" + quoteAuthor);
       
   }
   //get new quote button
   $(".button").click(function() {
        //check if the 'all' cat is selected
        if ($("#all").hasClass("selectedOption")) {
            randomCategory();
            randomQuote(currentCategory);
            updateBG(currentCategory);
        } 
        // get quote from current category
        else {
            randomQuote(currentCategory);
        }
   });
   
   
   
   // this button removes the selection class from the buttons and updates the selected one
   function updateSelectedButton(currentButton) {
       $("#astronomy").removeClass("selectedOption");
       $("#literature").removeClass("selectedOption");
       $("#technology").removeClass("selectedOption");
       $("#movies").removeClass("selectedOption");
       $("#all").removeClass("selectedOption");
       
       $("#" + currentButton).addClass("selectedOption");
   }
   //update the background image and color theme to match current category
   function updateBG(current) {
       
       $(".bg").css("background", 'url("/images/' + current + 'BG.jpg") no-repeat center center');
       $(".bg").css("background-size", "cover");
   }

   // button event handlers for categories
   //first add selected class to button
   // remove selected class from all other buttons
   // if random (all) button: generate random number for category
   //call function to get random quote and assing to variables
   // change background and color theme of navbar and footer, and header
   // display quote in quote box
   $("#astronomy").click(function(e) {
       e.preventDefault();
       currentCategory = "astronomy";
       updateSelectedButton("astronomy");
       updateBG("astronomy");
       randomQuote(currentCategory);
       updateQuoteDiv();
       
   });
   $("#literature").click(function(e) {
       e.preventDefault();
       currentCategory = "literature";
       updateSelectedButton(currentCategory);
       updateBG("literature");
       randomQuote(currentCategory);
       updateQuoteDiv();
   });
   $("#technology").click(function(e) {
       e.preventDefault();
       currentCategory = "technology";
       updateSelectedButton(currentCategory);
       updateBG("technology");
       randomQuote(currentCategory);
       updateQuoteDiv();      
   });
   $("#movies").click(function(e) {
       e.preventDefault();
       currentCategory = "movies"; 
       updateSelectedButton(currentCategory);
       updateBG("movies");
       randomQuote(currentCategory);
       updateQuoteDiv();
   });
   $("#all").click(function(e) {
       e.preventDefault();
       updateSelectedButton("all");       
       randomCategory(); //get random category
       var imagePath = 'url("/images/' + currentCategory + 'BG.jpg") no-repeat center center'
       updateBG(currentCategory); 
       randomQuote(currentCategory);  
       updateQuoteDiv();  
   });
   
   

   
   
   
   //center quote on screen
   function centerQuote () {
       // reset size to auto to allow landscape mobiles to resize correctly
       $(".quoteBox").css("height", "auto");
     var parentHeight =  $(".quoteBox").parent().outerHeight();
     var footerHeight = $("footer").outerHeight();
     var headerHeight = $("header").outerHeight();
   
    var quoteBoxHeight = $(".quoteBox").outerHeight();
    //find padding size of box
    var quotePadding = $(".quoteBox").outerHeight() - $(".quoteBox").height();
    
    
    // check if on mobile; on mobile devices don't count the hidden nav bar
     if ($(document).width() >= 700) {
         headerHeight += $("nav").outerHeight();
     }
     // calculate the needed height
    fullHeight = parentHeight - headerHeight - footerHeight;
    
    if (fullHeight <= quoteBoxHeight) {
        // add padding to quotebox
        $(".quoteBox").css("padding-top", "2em");
        $(".quoteBox").css("padding-bottom", "2em");
        quoteBoxPadHeight = $(".quoteBox").outerHeight();
        var bodyHeight = headerHeight + footerHeight + quoteBoxPadHeight; 
        $("body").css("height", bodyHeight + "px");
      }
    else {
        $(".quoteBox").css("height", fullHeight + "px"); 
    }
 
}
   // call function to center quotetext on all devices
   centerQuote();
   
   
   // click event handler for the navigation menu on mobile
   $("#navToggle").click(function(e) {
      e.preventDefault();
      
      $("nav").css("display","block");
      $("#closeButton").css("display", "block");
    });

    $("#closeButton").click(function(e) {
        $("#closeButton").css("display", "none");
        $("nav").css("display","none");
    });
    
    //when window is resized re-center quote and show or hide navbar
    $(window).resize(function() {
       centerQuote();
       
       if ($(document).width() < 700) {
            $("nav").css("display","none");
           $("#closeButton").css("display","none");
       }  
       else {
            $("nav").css("display","block");
           $("#closeButton").css("display","none"); 
       }
    });    
    
});