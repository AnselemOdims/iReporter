const myFunction= (evt, btnName) => {
    document.getElementById("defaultOpen").click();
    let reportForm= document.getElementsByClassName("reportForm");
    for(let i=0; i<reportForm.length; i++){
        reportForm[i].style.display = "none";
    }

    let reportButton = document.getElementsByClassName("reportButton");
    for(let i=0; i<reportButton.length; i++){
        reportButton[i].className = reportButton[i].className.replace(" active", "");
    }

    document.getElementById(btnName).style.display ="block";
    evt.Intervention.className += " active";
    
}


document.getElementById("defaultOpen").click();