
document.addEventListener("DOMContentLoaded", function() {
    getItemsOfCurrentUser();
    getFavouriteItemsOfCurrentUser();
});

function updateProfile()
{
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone_number = document.getElementById("phone_number").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert( xhr.responseText);
        }
    };
    xhr.open("POST", "/updateProfile", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({username: username, email: email, phone_number: phone_number}));
}

function getItemsOfCurrentUser()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            setItemsPanel(xhr.responseText);
        }
    };
    xhr.open("GET", "/getItemsOfCurrentUser", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
}

function setItemsPanel(response)
{
    var items = JSON.parse(response);
    var itemPanel = document.getElementById("item-panel");
    items.forEach(function(item) {
        var itemDiv = document.createElement("div");
        itemDiv.className = "item-box";
        itemDiv.style.display = "block";
        loadInnerContent("/static/html/itemContainer.html", function(innerContent) {
            itemDiv.innerHTML = innerContent.replace("{item.title}", item.title)
            .replace("{item.category}", item.category).replace("{item.price}", item.price)
            .replace("{item.id}", item._id.$oid)
            .replace("{item.image}", item.image)
            .replace("{item.description}", item.description);
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

async function deleteItem(itemId){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert(xhr.response);
            location.reload();
        }
    };
    xhr.open("POST", "/deleteItem", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(itemId));
}

function getFavouriteItemsOfCurrentUser()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            setFavouriteItemsPanel(xhr.responseText);
        }
    };
    xhr.open("GET", "/getFavouriteItemsOfCurrentUser", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send();
}


function setFavouriteItemsPanel(response)
{
    var items = JSON.parse(response);
    var itemPanel = document.getElementById("favourite-item-panel");
    items.forEach(function(item) {
        var itemDiv = document.createElement("div");
        itemDiv.className = "item-box";
        itemDiv.style.display = "block";
        loadInnerContent("/static/html/favouriteItemContainer.html", function(innerContent) {
            itemDiv.innerHTML = innerContent.replace("{item.title}", item.title)
            .replace("{item.category}", item.category)
            .replace("{item.price}", item.price)
            .replace("{item.image}", item.image)
            .replace("{item.description}", item.description)
        });

        itemPanel.appendChild(itemDiv);
    });
}