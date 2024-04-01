
var filters={
    category:"All",
    price_min:"0",
    price_max:"99999999"
};

document.addEventListener("DOMContentLoaded", function() {
    getAllItems();
});

async function getAllItems()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            setItemsPanel(xhr.response);
        }
    };
    xhr.open("GET", "/getAllItems", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
}

async function getAllItemsWithFilter()
{
    let data = JSON.stringify(filters);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            setItemsPanel(xhr.response);
        }
    };
    xhr.open("POST", "/getAllItemsWithFilter", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data);
}

function addCategoryToFilters(filter) {
    filters.category = filter;
    document.getElementById("All_checkbox").checked = false;
    document.getElementById("Vehicle_checkbox").checked = false;
    document.getElementById("Computer_checkbox").checked = false;
    document.getElementById("Phone_checkbox").checked = false;
    document.getElementById("Private Lesson_checkbox").checked = false;
    document.getElementById(filter+"_checkbox").checked = true;
}
function addMinPriceToFilters() {
    var minPriceSelect = document.getElementById("min-price");
    var selectedMinPrice = minPriceSelect.value;
    filters.price_min = selectedMinPrice;
}
function addMaxPriceToFilters() {
    var maxPriceSelect = document.getElementById("max-price");
    var selectedMaxPrice = maxPriceSelect.value;
    filters.price_max = selectedMaxPrice;
}

function setItemsPanel(response)
{
    var items = JSON.parse(response);
    var itemPanel = document.getElementById("item-panel");
    itemPanel.innerHTML = "";
    items.forEach(function(item) {
        var itemDiv = document.createElement("div");
        itemDiv.className = "item-box";
        itemDiv.style.display = "block";
        loadInnerContent("/static/html/itemContainerForHomePage.html", function(innerContent) {
            itemDiv.innerHTML = innerContent.replace("{item.title}", item.title)
            .replace("{item.category}", item.category)
            .replace("{item.price}", item.price)
            .replace("{item.image}", item.image)
            .replace("{item.description}", item.description)
            .replace("{item.id}", item._id.$oid);
        });

        itemPanel.appendChild(itemDiv);
    });
}


function loadInnerContent(filePath, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", filePath, true);
    xhr.send();
}

function openModal(objID) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            modal.style.display = "block";
            item = JSON.parse(xhr.response);
            var container = document.getElementsByClassName("modal-content")[0];
            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    if(key!="_id" && key!="owner_id" && key!="image" && key!="hide" && key!= "viewable_contact")
                    {   ;
                        var label = document.createElement('label');
                        label.setAttribute('id', key+"_label");
                        label.innerHTML = parseLabelName(key)+":";
                        container.appendChild(label);
                        var label2 = document.createElement('label');
                        label2.setAttribute('id', key);
                        label2.innerHTML = item[key];
                        container.appendChild(label2);
                        container.appendChild(document.createElement('br'));
                    }
                }
            }
        }
    };
    xhr.open("POST", "/getItemDetails", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({id: objID}));

}
window.addEventListener('click', function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
});
function closeModal() {
    modal.style.display = "none";
    var container = document.getElementsByClassName("modal-content")[0];
    var children = container.children;
    for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (child.tagName === 'LABEL' || child.tagName === 'BR') {
            container.removeChild(child);
        }
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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

function addItemToFavourites(objID) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert(xhr.response);
        }
    }

    xhr.open("POST", "/addItemToFavorites", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({id: objID}));

}