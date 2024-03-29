var item;

document.addEventListener("DOMContentLoaded", async function() {
    var url = window.location.href;
    var urlParams= new URLSearchParams(url.split('?')[1]);
    var id = urlParams.get('id');
    item = await getItem(id);
    setFormContent(item);
});

async function getItem(id)
{
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.open("POST", "/getItem", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({id: id}));
    });
}

async function setFormContent(item)
{
    var container = document.querySelector(".form-inner");
    var button = document.querySelector(".button-36");
    for (let key in item) {
        if (item.hasOwnProperty(key)) {
            if(key!="_id" && key!="ownerEmail")
            {   
                var label = document.createElement('label');
                label.setAttribute('id', key+"_label");
                label.innerHTML = parseLabelName(key);
                container.insertBefore(label, button);
                var input = document.createElement('input');
                input.setAttribute('id', key);
                input.setAttribute('type', 'text');
                input.setAttribute('placeholder', 'Enter here');
                input.value = item[key];
                if(key == "category")
                {
                    input.setAttribute('disabled', true);
                }
                container.insertBefore(input, button);
            }
        }
    }
}

function parseLabelName(string){
    let changeToUpper = true;
    let result = [];
    for(let i = 0; i < string.length; i++)
    {
        if(changeToUpper==true)
        {
            result.push(string[i].toUpperCase());
            changeToUpper = false;
        }
        else if(string[i]=="_")
        {
            changeToUpper = true;
            result.push(" ");
        }
        else
        {
            result.push(string[i]);
        }
    }
    return result.join("");
}

async function updateItem(){
    var container = document.querySelector(".form-inner");
    var inputs = container.querySelectorAll("input");
    inputs.forEach(function(input) {
        item[input.id] = input.value;
    });
    return new Promise((reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    alert(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            }
        };
        xhr.open("POST", "/updateItem", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(item));
    });
}