var siteName = document.querySelector("#site-name");
var siteUrl = document.querySelector("#website-url");
var table = document.querySelector("table");
var alert = document.querySelectorAll(".alert");
var data = [];
if(localStorage.getItem("data")){
    data = JSON.parse(localStorage.getItem("data"));
    display();
}
function add(){
    if(validationName()&&validationUrl()){
        var site = {
            name: siteName.value,
            url: siteUrl.value,
        };
        data.push(site);
        localStorage.setItem("data", JSON.stringify(data));
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid")
        display();
        resetInputs();
    }
}
function resetInputs(){
    siteName.value = null;
    siteUrl.value = null;
}
function display(){
    let tableContent = `
    <thead class="border-bottom">
            <th class="text-capitalize">Index</th>
            <th class="text-capitalize">Website Name</th>
            <th class="text-capitalize">Visit</th>
            <th class="text-capitalize">Delete</th>
    </thead>
    `;
    for(var i = 0; i < data.length; i++){
        tableContent += `
        <tbody id="tableContent">
                <td>${i + 1}</td>
                <td class="text-capitalize">${data[i].name}</td>
                <td>
                    <a href="${data[i].url}" target="_blank">
                    <button type="button" class="btn btn-success m-auto d-flex align-items-center gap-2"><i class="fa-solid fa-eye"></i>Visit</button>
                    </a>
                </td>
                <td>
                    <button type="button" class="btn btn-danger m-auto d-flex align-items-center gap-2" onclick="Delete(${i})"><i class="fa-solid fa-trash-can"></i>Delete</button>
                </td>
        </tbody>
        `;
    }
    table.innerHTML = tableContent;
}
function Delete(index){    
    data.splice(index,1);
    display();
    localStorage.setItem("data", JSON.stringify(data));
}
function validationUrl(){
    var regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}(\/[^\s]*)?/ig;
    if(regex.test(siteUrl.value)){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        alert[1].classList.add("d-none");
        return true;
    }
    else{
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
        alert[1].classList.remove("d-none");
        return false;
    }
}
function validationName(){
    var regex = /^[a-z( )?A-Z0-9]{3,12}$/;
    if(regex.test(siteName.value)){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        alert[0].classList.add("d-none");
        return true;
    }
    else{
        siteName.classList.remove("is-valid");
        siteName.classList.add("is-invalid");
        alert[0].classList.remove("d-none");
        return false;
    }
}