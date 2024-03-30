document.addEventListener("DOMContentLoaded", function() {
    toggleFields();
});

function toggleFields() {
    const category = document.getElementById('category').value;
    if (category === 'Vehicle') {
        document.getElementById("type").style.display = "block"
        document.getElementById("brand").style.display = "block"
        document.getElementById("model").style.display = "block"
        document.getElementById("year").style.display = "block"
        document.getElementById("color").style.display = "block"
        document.getElementById("engine_displacement").style.display = "block"
        document.getElementById("fuel_type").style.display = "block"
        document.getElementById("transmission_type").style.display = "block"
        document.getElementById("mileage").style.display = "block"
        
        document.getElementById("type_label").style.display = "block"
        document.getElementById("brand_label").style.display = "block"
        document.getElementById("model_label").style.display = "block"
        document.getElementById("year_label").style.display = "block"
        document.getElementById("color_label").style.display = "block"
        document.getElementById("engine_displacement_label").style.display = "block"
        document.getElementById("fuel_type_label").style.display = "block"
        document.getElementById("transmission_type_label").style.display = "block"
        document.getElementById("mileage_label").style.display = "block"

        document.getElementById("processor").style.display = "none"
        document.getElementById("ram").style.display = "none"
        document.getElementById("storage").style.display = "none"
        document.getElementById("graphics_card").style.display = "none"
        document.getElementById("operating_system").style.display = "none"
        document.getElementById("camera_specifications").style.display = "none"
        document.getElementById("battery_capacity").style.display = "none"
        document.getElementById("tutor_name").style.display = "none"
        document.getElementById("lessons").style.display = "none"
        document.getElementById("location").style.display = "none"
        document.getElementById("duration").style.display = "none"

        document.getElementById("processor_label").style.display = "none"
        document.getElementById("ram_label").style.display = "none"
        document.getElementById("storage_label").style.display = "none"
        document.getElementById("graphics_card_label").style.display = "none"
        document.getElementById("operating_system_label").style.display = "none"
        document.getElementById("camera_specifications_label").style.display = "none"
        document.getElementById("battery_capacity_label").style.display = "none"
        document.getElementById("tutor_name_label").style.display = "none"
        document.getElementById("lessons_label").style.display = "none"
        document.getElementById("location_label").style.display = "none"
        document.getElementById("duration_label").style.display = "none"

    } else if (category === 'Computer') {
        document.getElementById("type").style.display = "block"
        document.getElementById("brand").style.display = "block"
        document.getElementById("model").style.display = "block"
        document.getElementById("year").style.display = "block"
        document.getElementById("color").style.display = "none"
        document.getElementById("engine_displacement").style.display = "none"
        document.getElementById("fuel_type").style.display = "none"
        document.getElementById("transmission_type").style.display = "none"
        document.getElementById("mileage").style.display = "none"
        
        document.getElementById("type_label").style.display = "block"
        document.getElementById("brand_label").style.display = "block"
        document.getElementById("model_label").style.display = "block"
        document.getElementById("year_label").style.display = "block"
        document.getElementById("color_label").style.display = "none"
        document.getElementById("engine_displacement_label").style.display = "none"
        document.getElementById("fuel_type_label").style.display = "none"
        document.getElementById("transmission_type_label").style.display = "none"
        document.getElementById("mileage_label").style.display = "none"

        document.getElementById("processor").style.display = "block"
        document.getElementById("ram").style.display = "block"
        document.getElementById("storage").style.display = "block"
        document.getElementById("graphics_card").style.display = "block"
        document.getElementById("operating_system").style.display = "block"
        document.getElementById("camera_specifications").style.display = "none"
        document.getElementById("battery_capacity").style.display = "none"
        document.getElementById("tutor_name").style.display = "none"
        document.getElementById("lessons").style.display = "none"
        document.getElementById("location").style.display = "none"
        document.getElementById("duration").style.display = "none"

        document.getElementById("processor_label").style.display = "block"
        document.getElementById("ram_label").style.display = "block"
        document.getElementById("storage_label").style.display = "block"
        document.getElementById("graphics_card_label").style.display = "block"
        document.getElementById("operating_system_label").style.display = "block"
        document.getElementById("camera_specifications_label").style.display = "none"
        document.getElementById("battery_capacity_label").style.display = "none"
        document.getElementById("tutor_name_label").style.display = "none"
        document.getElementById("lessons_label").style.display = "none"
        document.getElementById("location_label").style.display = "none"
        document.getElementById("duration_label").style.display = "none"

    } else if (category === 'Phone'){
        document.getElementById("type").style.display = "none"
        document.getElementById("brand").style.display = "block"
        document.getElementById("model").style.display = "block"
        document.getElementById("year").style.display = "block"
        document.getElementById("color").style.display = "none"
        document.getElementById("engine_displacement").style.display = "none"
        document.getElementById("fuel_type").style.display = "none"
        document.getElementById("transmission_type").style.display = "none"
        document.getElementById("mileage").style.display = "none"
        
        document.getElementById("type_label").style.display = "none"
        document.getElementById("brand_label").style.display = "block"
        document.getElementById("model_label").style.display = "block"
        document.getElementById("year_label").style.display = "block"
        document.getElementById("color_label").style.display = "none"
        document.getElementById("engine_displacement_label").style.display = "none"
        document.getElementById("fuel_type_label").style.display = "none"
        document.getElementById("transmission_type_label").style.display = "none"
        document.getElementById("mileage_label").style.display = "none"

        document.getElementById("processor").style.display = "block"
        document.getElementById("ram").style.display = "block"
        document.getElementById("storage").style.display = "block"
        document.getElementById("graphics_card").style.display = "none"
        document.getElementById("operating_system").style.display = "block"
        document.getElementById("camera_specifications").style.display = "block"
        document.getElementById("battery_capacity").style.display = "block"
        document.getElementById("tutor_name").style.display = "none"
        document.getElementById("lessons").style.display = "none"
        document.getElementById("location").style.display = "none"
        document.getElementById("duration").style.display = "none"

        document.getElementById("processor_label").style.display = "block"
        document.getElementById("ram_label").style.display = "block"
        document.getElementById("storage_label").style.display = "block"
        document.getElementById("graphics_card_label").style.display = "none"
        document.getElementById("operating_system_label").style.display = "block"
        document.getElementById("camera_specifications_label").style.display = "block"
        document.getElementById("battery_capacity_label").style.display = "block"
        document.getElementById("tutor_name_label").style.display = "none"
        document.getElementById("lessons_label").style.display = "none"
        document.getElementById("location_label").style.display = "none"
        document.getElementById("duration_label").style.display = "none"
    }
    else {
        document.getElementById("type").style.display = "none"
        document.getElementById("brand").style.display = "none"
        document.getElementById("model").style.display = "none"
        document.getElementById("year").style.display = "none"
        document.getElementById("color").style.display = "none"
        document.getElementById("engine_displacement").style.display = "none"
        document.getElementById("fuel_type").style.display = "none"
        document.getElementById("transmission_type").style.display = "none"
        document.getElementById("mileage").style.display = "none"
        
        document.getElementById("type_label").style.display = "none"
        document.getElementById("brand_label").style.display = "none"
        document.getElementById("model_label").style.display = "none"
        document.getElementById("year_label").style.display = "none"
        document.getElementById("color_label").style.display = "none"
        document.getElementById("engine_displacement_label").style.display = "none"
        document.getElementById("fuel_type_label").style.display = "none"
        document.getElementById("transmission_type_label").style.display = "none"
        document.getElementById("mileage_label").style.display = "none"

        document.getElementById("processor").style.display = "none"
        document.getElementById("ram").style.display = "none"
        document.getElementById("storage").style.display = "none"
        document.getElementById("graphics_card").style.display = "none"
        document.getElementById("operating_system").style.display = "none"
        document.getElementById("camera_specifications").style.display = "none"
        document.getElementById("battery_capacity").style.display = "none"
        document.getElementById("tutor_name").style.display = "block"
        document.getElementById("lessons").style.display = "block"
        document.getElementById("location").style.display = "block"
        document.getElementById("duration").style.display = "block"

        document.getElementById("processor_label").style.display = "none"
        document.getElementById("ram_label").style.display = "none"
        document.getElementById("storage_label").style.display = "none"
        document.getElementById("graphics_card_label").style.display = "none"
        document.getElementById("operating_system_label").style.display = "none"
        document.getElementById("camera_specifications_label").style.display = "none"
        document.getElementById("battery_capacity_label").style.display = "none"
        document.getElementById("tutor_name_label").style.display = "block"
        document.getElementById("lessons_label").style.display = "block"
        document.getElementById("location_label").style.display = "block"
        document.getElementById("duration_label").style.display = "block"
    }
}

async function addItem(){
    const category = document.getElementById('category').value;
    let data;
    if (category === 'Vehicle') {
        data = {
            category: category,
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            image: document.getElementById('image').value,
            description: document.getElementById('description').value,
            type: document.getElementById('type').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value,
            color: document.getElementById('color').value,
            engine_displacement: document.getElementById('engine_displacement').value,
            fuel_type: document.getElementById('fuel_type').value,
            transmission_type: document.getElementById('transmission_type').value,
            mileage: document.getElementById('mileage').value
        };
    } else if (category === 'Computer') {
        data = {
            category: category,
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            image: document.getElementById('image').value,
            description: document.getElementById('description').value,
            type: document.getElementById('type').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value,
            processor: document.getElementById('processor').value,
            ram: document.getElementById('ram').value,
            storage: document.getElementById('storage').value,
            graphics_card: document.getElementById('graphics_card').value,
            operating_system: document.getElementById('operating_system').value
        };
    } else if (category === 'Phone') {
        data = {
            category: category,
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            image: document.getElementById('image').value,
            description: document.getElementById('description').value,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
            year: document.getElementById('year').value,
            processor: document.getElementById('processor').value,
            ram: document.getElementById('ram').value,
            storage: document.getElementById('storage').value,
            operating_system: document.getElementById('operating_system').value,
            camera_specifications: document.getElementById('camera_specifications').value,
            battery_capacity: document.getElementById('battery_capacity').value
        };
    } else {
        data = {
            category: category,
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            image: document.getElementById('image').value,
            description: document.getElementById('description').value,
            tutor_name: document.getElementById('tutor_name').value,
            lessons: document.getElementById('lessons').value,
            location: document.getElementById('location').value,
            duration: document.getElementById('duration').value
        };
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert(xhr.response);
        }
    };
    xhr.open("POST", "/addItem", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
}