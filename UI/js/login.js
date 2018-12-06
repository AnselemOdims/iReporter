const myFunction = () => {
    let y = document.getElementById("password");
    
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }
   
}