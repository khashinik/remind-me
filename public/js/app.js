var googleUser = {}

function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    // var userInfoElem = document.getElementById("userinfo");
    // // var token = googleUser.getAuthResponse().id_token;
    // //take this and set up a route to send this to the database.  

    // addToElement(userInfoElem, "H2", 'User Info');
    // addToElement(userInfoElem, "LI", 'ID: ' + profile.getId());
    // addToElement(userInfoElem, "LI", 'Name: ' + profile.getName());
    // addToElement(userInfoElem, "LI", 'eMail: ' + profile.getEmail());

    // console.log(googleUser);
    $("#siginbutton").remove();
    // var picture = $("<img>");
    // picture.attr("src", profile.getImageUrl());
    // $("#userinfo").append(picture);
    var currentUser = {
        id: profile.getId(),
        uName: profile.getName(),
        email: profile.getEmail(),
        photo: profile.getImageUrl()
    }

    $.ajax({
        url: "/api/userpresent",
        method: "POST",
        data: currentUser
    }).then(function (response) {
        console.log(response);
        // if(response=="doesExist"){
            $.ajax({
                url: "/record",
                method: "get",
                success: function(response){
                    window.location.href = "/record"
                    sessionStorage['cUser'] = JSON.stringify(currentUser);
                    $("body").html(response);
                },
                error: function(err){
                    console.log(err);
                }
            })
            // .then(function (data) {
            //     console.log(data);
            //     // })
            //     // document.write(data);
            //     window.location.assign = "/public/record.html"
            //     sessionStorage['cUser'] = JSON.stringify(currentUser);

            })

    }
    


function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('siginbutton', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function addToElement(element, type, text) {
    var node = document.createElement(type);
    var content = document.createTextNode(text);
    node.appendChild(content);
    element.appendChild(node);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        var userInfoElem = document.getElementById("userinfo");
        while (userInfoElem.firstChild) {
            userInfoElem.removeChild(userInfoElem.firstChild);
        }
    });
    auth2.disconnect();
}