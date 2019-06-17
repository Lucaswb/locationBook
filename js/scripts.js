// Business Logic for LocationBook ---------
function LocationBook() {
  this.places = [],
  this.currentId = 0
}

LocationBook.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}
// // this will attempt to update the contact in the address Book.
// LocationBook.prototype.updateContact = function(id) {
//   var updateFirst= prompt("please enter a new first name:")
//   var updateLast= prompt("please enter a new Last name:")
//   var updateNumber= prompt("please enter a new number:")
//   for (var i=0; i< this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//
//         this.contacts[i].firstName = updateFirst;
//         this.contacts[i].lastName = updateLast;
//         this.contacts[i].phoneNumber = updateNumber;
//       }
//     }
//   };
// }
//
LocationBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

LocationBook.prototype.findPlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        return this.places[i];
      }
    }
  };
  return false;
}

LocationBook.prototype.deletePlace = function(id) {
  for (var i=0; i< this.places.length; i++) {
    if (this.places[i]) {
      if (this.places[i].id == id) {
        delete this.places[i];
        return true;
      }
    }
  };
  return false;
}
function attachPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    locationBook.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(locationBook);
  });

};


// Business Logic for Place ---------
function Place(country, city, landmark, date, notes) {
  this.country = country,
  this.cityName = city,
  this.landmarks = landmark,
  this.date = date,
  this.notes = notes
}

Place.prototype.fullLocation = function() {
  return this.cityName + ", " + this.country;
}
function showPlace(placeId) {
  var place = locationBook.findPlace(placeId);
  $("#show-place").show();
  $(".country").html(place.country);
  $(".cityName").html(place.cityName);
  $(".landmarks").html(place.landmarks);
  $(".date").html(place.date);
  $(".notes").html(place.notes);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + place.id + ">Delete</button>");

}

// User Interface Logic ---------
var locationBook = new LocationBook();

function displayPlaceDetails(locationBookToDisplay) {
  var placesList = $("ul#places");
  var htmlForPlaceInfo = "";
  locationBookToDisplay.places.forEach(function(place) {
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.cityName + ", " + place.country + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
};

$(document).ready(function() {
  attachPlaceListeners();
  $("form#new-location").submit(function(event) {
    event.preventDefault();
    debugger;
    var inputtedCountry = $("input#new-country").val();
    var inputtedCityName = $("input#new-cityName").val();
    var inputtedLandmark = $("input#new-landmarks").val();
    var inputtedDate = $("input#new-date").val();
    var inputtedNote = $("input#new-notes").val();

    $("input#new-country").val("");
    $("input#new-cityName").val("");
    $("input#new-landmarks").val("");
    $("input#new-date").val("");
    $("input#new-notes").val("");

    var newPlace = new Place(inputtedCountry, inputtedCityName, inputtedLandmark,inputtedDate, inputtedNote);
    locationBook.addPlace(newPlace);
    displayPlaceDetails(locationBook);
  })
})
