const myFunction = () => {
    let x = document.getElementById("password");
    let y = document.getElementById("password1");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
    if (y.type === "password"){
        y.type = "text";
    } else {
        y.type = "password";
    }
}
  