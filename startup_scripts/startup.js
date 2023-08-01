// priority: 0
global.kubecrops = {};
global.kubecrops.ids = {};
global.kubecrops.loot = {};
global.kubecrops.ingredients = {};


onEvent('item.registry', event => {
	function createFertilizer(type, drop, ingredient) {
		let displayName = type[0].toUpperCase() + type.slice(1);

		event.create(`${type}_fertilizer`).displayName(`${displayName} Fertilizer`);

		global.kubecrops.loot[type] = drop;
		global.kubecrops.ids[type] = `kubejs:${type}_fertilizer`
		global.kubecrops.ingredients[type] = ingredient

	}
	createFertilizer("iron", "minecraft:iron_ingot", "minecraft:iron_block");
	createFertilizer("emerald", "minecraft:emerald", "minecraft:emerald_block");
	createFertilizer("gold", "minecraft:gold_ingot", "minecraft:gold_block");
	createFertilizer("diamond", "minecraft:diamond", "minecraft:diamond_block");
	createFertilizer("copper", "minecraft:copper_ingot", "minecraft:copper_block");
	createFertilizer("lapis", "minecraft:lapis_lazuli", "minecraft:lapis_lazuli_block");
	createFertilizer("redstone", "minecraft:redstone", "minecraft:redstone_block");
	createFertilizer("ancient", "minecraft:netherite_scrap", "minecraft:netherite_block");
})