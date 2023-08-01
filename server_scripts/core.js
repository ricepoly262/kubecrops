const CROPCLASS = java('net.minecraft.world.level.block.CropBlock')
const KUBECROPS_FILEPATH = 'kubejs/data/kubecrops/crops.json';
//let inspect = global.functions.inspect;
let kubecrops_crops = {};

kubecrops_load();


// structure:
// kubecrops_crops = {}
// kubecrops_crops.key = {}
// key = "x,y,z"
// crop = crops.key
// crop.type = 'emerald'
// crop.pos = {}
// crop.pos.x
// crop.pos.y
// crop.pos.z


function kubecrops_load() { // gets all the crops
    console.log("[KC] Reading crop file");
    kubecrops_crops = JsonIO.read(KUBECROPS_FILEPATH) || {};
    if (kubecrops_crops == {}) {
        console.log("[KC] ERROR: Crop file empty or failed to load!")
    } else {
        console.log("[KC] Successfully read crop list")
    }

}




function kubecrops_isMagical(crop) { // checks if a given crop is a magical crop via location
    kubecrops_load();
    let cropkey = kubecrops_cropkey(crop)
    let rtn = false //idk some weird loop escape thing i don't understand

    Object.keys(kubecrops_crops).forEach(key => {
        if (key == cropkey) {
            rtn = !(kubecrops_crops[cropkey].equals({}))
        }
    })

    return rtn  //idk some weird loop escape thing i don't understand
}

function kubecrops_cropkey(crop) { // generates a crop key based on the crop's position
    let x = crop.pos.x;
    let y = crop.pos.y;
    let z = crop.pos.z;
    let level = 'overworld' // placeholder
    let cropkey = `${level}[${x},${y},${z}]`;
    return cropkey;
}

function kubecrops_makeTemporaryPlant(block) {
    let plant = {}
    plant.pos = {};
    plant.pos.x = block.pos.x;
    plant.pos.y = block.pos.z;
    plant.pos.z = block.pos.y;
    return plant;
}


function kubecrops_getMagical(crop) { // gets the data of a magical crop
    kubecrops_load();
    if (kubecrops_isMagical(crop)) {
        return kubecrops_crops[kubecrops_cropkey(crop)]
    }

    return false;
}

function kubecrops_getLoot(type) { // checks if a given crop is a magical crop via location

    return global.kubecrops.loot[type];

}


function kubecrops_remove(crop) { // saves a crop to the file 
    kubecrops_load();

    if (kubecrops_isMagical(crop)) { //Crop is a magical crop
        let cropkey = kubecrops_cropkey(crop)

        kubecrops_crops[cropkey] = {};

        JsonIO.write(KUBECROPS_FILEPATH, kubecrops_crops);

        let isMagic = kubecrops_isMagical(crop) // check if it was removed
        if (isMagic) {
            // it was not removed
            return false;
        }

        return true; // it was removed
    }
    // it's not a magical crop
    return false


}

function kubecrops_save(crop) { // saves a crop to the file 
    kubecrops_load();

    if (!kubecrops_isMagical(crop)) { // check if it is magic crop

        let cropkey = kubecrops_cropkey(crop);

        kubecrops_crops[cropkey] = {};
        kubecrops_crops[cropkey].type = crop.type;
        kubecrops_crops[cropkey].pos = crop.pos;

        JsonIO.write(KUBECROPS_FILEPATH, kubecrops_crops);

        let isMagic = kubecrops_isMagical(crop) // check if it was saved 

        if (isMagic) {
            // it was saved
            return true
        }
        // it was not saved 
        return false
    }
    // it's already a magical crop
    return false


}