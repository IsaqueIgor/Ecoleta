import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([
        {title: 'Lamps', image: 'lamps.svg'},
        {title: 'Paper and Cardboard', image: 'paper.svg'},
        {title: 'Batteries', image: 'batteries.svg'},
        {title: 'e-waste', image: 'ewaste.svg'},
        {title: 'Organic Waste', image: 'owaste.svg'},
        {title: 'Cooking Oil', image: 'oil.svg'},
    ])
}