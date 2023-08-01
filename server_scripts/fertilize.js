onEvent('block.right_click', event => {
    let block = event.block;
    let blockState = block.blockState;

    if (blockState.block instanceof CROPCLASS) {
        let ply = event.player;

        if (!ply.isFake()) {
            if (ply.getMainHandItem().hasTag("kubecrops:fertilizer")) {
                let plant = kubecrops_makeTemporaryPlant(block);
                plant.type = ply.getMainHandItem().vanillaItems[0].toString().replace("_fertilizer", "");
                if (kubecrops_save(plant)) {
                    ply.getMainHandItem().count--;
                    event.server.runCommandSilent(`playsound minecraft:block.crop.break block @a ${block.x} ${block.y} ${block.z} 1 0.1`);
                    ply.tell("Fertilized!")
                }


            }
        }
    }
})