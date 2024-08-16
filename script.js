function submitEmail() {
    var email = document.getElementById("email").value;
    if (email) {
        alert("Thank you for signing up! You will be updated with the latest BIM news and resources.");
        document.getElementById("signup-form").reset();
    } else {
        alert("Please enter a valid email address.");
    }
}
