
document.addEventListener("DOMContentLoaded", function() {
    getItems();
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

function getItems()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            setItemsPanel(xhr.responseText);
        }
    };
    xhr.open("GET", "/getItems", true);
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
            itemDiv.innerHTML = innerContent.replace("{item.name}", item.name).replace("{item.category}", item.category).replace("{item.price}", item.price).replace("{item.id}", item._id.$oid);
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