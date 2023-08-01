let idTable = global.kubecrops.ids;
let idKeys = Object.keys(idTable);

onEvent('item.tags', e => {
	idKeys.forEach(key => {
		let id = idTable[key];
		e.add(`kubecrops:fertilizer`, id);
		console.log(`Added fertilizer tag to ${id}`);
	});
});

function blockRecipe(e, output, input, id) {

	let A1 = input;
	let B = 'minecraft:air';

	e.shaped(Item.of(output), [
		'AAA',
		'ABA',
		'AAA'
	], {
		A: A1, B: B
	}).id(`kubejs:kubecrops/${id}`);

}



onEvent('recipes', e => {
	idKeys.forEach(key => {
		let id = idTable[key];
		let ingredient = global.kubecrops.ingredients[key];
		blockRecipe(e, Item.of(id), Item.of(ingredient), key);
		console.log(`Created recipe for ${id}`);
	});
});

