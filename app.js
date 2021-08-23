let register = () => {
    let username = document.getElementById("username");
    let city = document.getElementById("city");
    let country = document.getElementById("country");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let phone = document.getElementById("phone");
    let adderss = document.getElementById("address");
    let loader = document.getElementById("loader");
    let loaderText = document.getElementById("loaderText");


    let data = {
        username: username.value,
        city: city.value,
        country: country.value,
        phone: phone.value,
        email: email.value,
        address: address.value,
        password: password.value,
    }

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            firebase.database().ref(`users`).child(res.user.uid).set(data)
            console.log("user==>", res.user)

        })
        .then(() => {
            let successDivv = document.getElementById('successDiv');
            successDivv.innerHTML = "User Register Successfully";
            successDiv.style.display = "block";
            username.value = "";
            email.value = "";
            password.value = "";
            errorDiv.style.display = "none";
            loaderText.style.display = "block";
            loader.style.display = "none";

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    window.location = "profile.html"
                        // ...
                } else {
                    window.location = "signup.html"
                }
            });
        })
        .catch((err) => {
            console.log(err.message)
            let errorDiv = document.getElementById("errorDiv");
            errorDiv.innerHTML = err.messasge;
            errorDiv.style.display = "block";
            loaderText.style.display = "block";
            loader.style.display = "none";

        })

}
let login = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            firebase.database().ref(`users/${user.uid}`)
                .once('value', (data) => {
                    console.log(data.val())
                    window.location = "profile.html"

                })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            console.log(errorCode)
        });

}