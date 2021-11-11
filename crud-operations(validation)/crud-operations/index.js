
//////////////////////////////////////////////////////   validation ////////////////////////////////////////////////////////

// (function validation() {
//     'use strict';
//     window.addEventListener('load', function() {
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.getElementsByClassName('needs-validation');
//     // Loop over them and prevent submission
//     var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//         }, false);
//     });
//     }, false);
// })();

    function validation() {
        var formrdvalid = false;
    
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var email = document.getElementById("email").value;
        var city =  document.getElementById("city");
        var contact = document.getElementById("contact").value;
        var radios = document.getElementsByName("gender");
        var agree = document.getElementById("invalidCheck").checked;
        
        //   console.log("fname ---> ", fname);
        //   console.log("lname ---> ", lname);
        //   console.log("email ---> ", email);
        //   console.log("mobile ---> ", mobile);
    
        if (fname == "") {
        // console.log("in firstname");
        alert("please enter firstname");
        }
    
        if (lname == "") {
        // console.log("in lastname");
        alert("please enter lastname");
        }
    
        if (email == "") {
        // console.log("in email");
        alert("please enter email");

        } 

        if (city.selectedIndex === 0) {
            alert("select the city");
            return false;
        }

        let contactValidate = /^\d{10}$/;
        if (contact == "") {
        // console.log("in mobile");
        alert("please enter mobile number");
        } else if (!contact.match(contactValidate)) {
        // console.log("in mobile");
        alert("please enter 10 digit in mobile number");
        
        } 
        if (!formrdvalid) {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
            formrdvalid = true;
            }
        }
        }
    
        if (!formrdvalid) {
        // console.log("in gender");
        alert( "please select gender");
        return false;
        }

        if(agree === false){
            alert("agree terms and conditions");
        }
       // document.querySelector('#accept:checked') !== null
    
        if (!fname || !lname || !email || !city || !contact || !radios || !agree ) {
        return false;
        } else {
        return true;
        }
    }


/////////////////////////////////////////////////// insert into local-storage/table ///////////////////////////////////////////////


var ckeckboxSelect = {
    Football: false,
    Cricket: false,
    Basketball: false,
    Tennis: false,
};
let Data = {};

let datashow = JSON.parse(localStorage.getItem("userdata"));
if (datashow !== null) {
    datashow && datashow.map((element, index) => {
        var tr = `<tr>`;

        tr += `<td>${element.fname}</td>`;
        tr += `<td>${element.lname}</td>`;
        tr += `<td>${element.email}</td>`;
        tr += `<td>${element.city}</td>`;
        tr += `<td>${element.contact}</td>`;
        tr += `<td>${element.gender}</td>`;
        var getkey = '';
        for (let key in element.hobby) {
            if (element.hobby[key] === true) {
                getkey = getkey + key + ',';
            }
        }

        // var hobbies = [];
        // var checkbox = document.querySelectorAll(".hobbies");
        // for (let i = 0; i < checkbox.length; i++) {
        //   if (checkbox[i].checked == true) {
        //     hobbies.push(checkbox[i].value);
        //   }
        // }
        
        tr += `<td>${getkey}</td>`;
        tr = tr + `<td>`;
        tr = tr + `<button type="button" id="edit" onclick="onEdit(${index})"  >Edit</button>` +
            `<button type="button" id="delete" onclick="onDelete(${index})">Delete</button>`
        tr = tr + `</td>`;

        tr = tr + `</tr>`;

        document.querySelector('#tbody').innerHTML += tr;
    });

}

////////////////////////////////////////////////////////////// reading values //////////////////////////////////////////////////////

var indexOfEdit;
function sendIndex(index) {
    indexOfEdit = index;
}

function onSubmit() {
    // event.preventDefault();
    var locStorageData = JSON.parse(localStorage.getItem("userdata"));
    var validateOk = validation();
    if(validateOk === true){
    if (indexOfEdit === null || indexOfEdit === undefined || indexOfEdit === '') {
        //Insert
        console.log(locStorageData);

        let arrok = (() => {
            return locStorageData === null ? [] : locStorageData;
        })();
        arrok.push(Data);
        localStorage.setItem("userdata", JSON.stringify(arrok));
    } else {
        //Edit
        locStorageData[indexOfEdit].fname = document.getElementById('fname').value;

        locStorageData[indexOfEdit].lname = document.getElementById('lname').value;

        locStorageData[indexOfEdit].email = document.getElementById('email').value;

        locStorageData[indexOfEdit].contact = document.getElementById('contact').value;

        if (document.getElementById('male').checked === true) {
            locStorageData[indexOfEdit].gender = 'male';
        } else if (document.getElementById('female').checked === true) {
            locStorageData[indexOfEdit].gender = 'female';
        }

        if (document.getElementById('city').value === 'surat') {
            locStorageData[indexOfEdit].city = 'surat';
        } else if (document.getElementById('city').value === 'ahemdabad') {
            locStorageData[indexOfEdit].city = 'ahemdabad';
        } else if (document.getElementById('city').value === 'vadodara') {
            locStorageData[indexOfEdit].city = 'vadodara';
        }

        if (document.getElementById('Football').checked === true) {
            locStorageData[indexOfEdit].hobby.Football = true;
        } else {
            locStorageData[indexOfEdit].hobby.Football = false;
        }
        if (document.getElementById('Cricket').checked === true) {
            locStorageData[indexOfEdit].hobby.Cricket = true;
        } else {
            locStorageData[indexOfEdit].hobby.Cricket = false;
        }
        if (document.getElementById('Basketball').checked === true) {
            locStorageData[indexOfEdit].hobby.Basketball = true;
        } else {
            locStorageData[indexOfEdit].hobby.Basketball = false;
        }
        if (document.getElementById('Tennis').checked === true) {
            locStorageData[indexOfEdit].hobby.Tennis = true;
        } else {
            locStorageData[indexOfEdit].hobby.Tennis = false;
        }

        localStorage.setItem("userdata", JSON.stringify(locStorageData));
    }
}
}

function onChange(e) {
    let name = e.name;
    let value = e.value;

    Data[name] = value;
    console.log("USEROBJ   ", Data);
}

function onChangeHobby(e) {
    let name = e.name;
    let checked = e.checked;
    if (checked) {
        ckeckboxSelect[name] = checked;
        Data["hobby"] = ckeckboxSelect;
    } else {
        ckeckboxSelect[name] = checked;
        Data["hobby"] = ckeckboxSelect;
    }

    console.log("USEROBJ   ", Data);
}

////////////////////////////////////////////////////////// editing values //////////////////////////////////////////////////////

function onEdit(index) {
    console.log('Edit index --> ', index);
    var locStorageData = JSON.parse(localStorage.getItem("userdata"));
    document.getElementById('fname').value = locStorageData[index].fname;
    document.getElementById('lname').value = locStorageData[index].lname;
    document.getElementById('email').value = locStorageData[index].email;
    document.getElementById('contact').value = locStorageData[index].contact;

    if (locStorageData[index].gender === 'male') {
        document.getElementById('male').checked = true;
    } else if (locStorageData[index].gender === 'female') {
        document.getElementById('female').checked = true;
    }

    if (locStorageData[index].inputCity === 'surat') {
        document.getElementById('city').value = locStorageData[index].city;
    } else if (locStorageData[index].inputCity === 'ahemdabad') {
        document.getElementById('city').value = locStorageData[index].city;
    } else if (locStorageData[index].inputCity === 'vadodara') {
        document.getElementById('city').value = locStorageData[index].city;
    } else {
        document.getElementById('city').value = locStorageData[index].city;
    }

    if (locStorageData[index].hobby.Football === true) {
        document.getElementById('Football').checked = true;
    } else {
        document.getElementById('Football').checked = false;
    }
    if (locStorageData[index].hobby.Cricket === true) {
        document.getElementById('Cricket').checked = true;
    } else {
        document.getElementById('Cricket').checked = false;

    }
    if (locStorageData[index].hobby.Basketball === true) {
        document.getElementById('Basketball').checked = true;
    } else {
        document.getElementById('Basketball').checked = false;
    }
    if (locStorageData[index].hobby.Tennis === true) {
        document.getElementById('Tennis').checked = true;
    } else {
        document.getElementById('Tennis').checked = false;
    }

    sendIndex(index);
}

////////////////////////////////////////////////////////////////  deleting values /////////////////////////////////////////////////

function onDelete(index) {
    var locStorageData = JSON.parse(localStorage.getItem("userdata"));

    if(confirm("you want to delete?")){
    locStorageData.splice(index, 1);}

    localStorage.setItem("userdata", JSON.stringify(locStorageData));

    window.location.reload(true);
}