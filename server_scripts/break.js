onEvent('block.break', event => {
    let block = event.block;

    if (event.block.blockState.block instanceof CROPCLASS) {
        let ply = event.entity;
        if (!ply.isFake() ){
            let plant = kubecrops_makeTemporaryPlant(block);
            if(kubecrops_isMagical(plant)){
                kubecrops_remove(plant);
                event.server.runCommandSilent(`playsound minecraft:enchant.thorns.hit master @a ${block.x} ${block.y} ${block.z}`);
            }
        }
    }
})