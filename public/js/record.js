var currentUser = JSON.parse(sessionStorage["cUser"]);
console.log("Current User: " + JSON.stringify(currentUser));
var picture = $("<img>");
console.log("picture: "+ currentUser.photo)
picture.attr("src", currentUser.photo);
// var uList = $("<ul>")
var name = $("<li>").text((currentUser.uName));
console.log((currentUser.uName))


// uList.append(name);



$("#userinfo").append(picture);
$("#userinfo").append(name);
