// Special thanks to CheifArug and KubeJS Discord

onEvent('block.right_click', event => {
    let block = event.block;
    let blockState = block.blockState;

    if (blockState.block instanceof CROPCLASS) {
        let ply = event.player;

        if (!ply.isFake()) {
            if (blockState.block.isMaxAge(blockState)) {
                let loot = block.getDrops(ply, ply.getMainHandItem());
                let seedYeeted = false;
                let plant = kubecrops_makeTemporaryPlant(block);

                for (let i in loot) {
                    if (loot[i].id == block.item.id) { // stop from getting more seeds
                        loot[i].count--;
                        seedYeeted = true;
                    }
                    if ((loot[i].id == Item.of('minecraft:wheat')) && kubecrops_isMagical(plant)) {
                        let type = '';
                        loot[i] = Item.of(kubecrops_getLoot(kubecrops_getMagical(plant).type));
                        loot[i].setCount(1);
                    }
                    block.popItemFromFace(loot[i], event.getFacing());
                }
                if (seedYeeted) {
                    block.set(block.id, { age: '0' });
                    event.server.runCommandSilent(`playsound minecraft:block.crop.break block @a ${block.x} ${block.y} ${block.z}`);
                } else { //if no seed was dropped for some odd reason
                    block.minecraftLevel.destroyBlock(block.pos, true, null, 32);
                }
                event.cancel();
                ply.swingArm(event.hand);
            }
        }
    }
})