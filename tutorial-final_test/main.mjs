import { utils, prototypes, constants } from '/game';
import { WORK, MOVE, ATTACK, RANGED_ATTACK, CARRY, HEAL, TOUGH} from '/game/constants';


prototypes.Creep.prototype.is_attacker = function() {
    if (this.body.some( bodyPart => bodyPart.type == ATTACK )) {
        return true
    }
    else {
        return false
    }
}

prototypes.Creep.prototype.is_worker = function() {
    if (this.body.some( bodyPart => bodyPart.type == WORK)) {
        return true
    }
    else {
        return false
    }
}

prototypes.Creep.prototype.is_healer = function() {
    if (this.body.some(bodyPart => bodyPart.type == HEAL)) {
        return true
    }
    else {
        return false
    }
}

prototypes.Creep.prototype.is_ranged_attacker = function() {
    if (this.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
        return true
    }
    else {
        return false
    }
}

// prototypes.Creep.prototype.is_claimer = function() {
//     if (this.body.some(bodyPart => bodyPart.type == CLAIM)) {
//         return true
//     }
//     else {
//         return false
//     }
// }


// COSTS of creep spawn

// WORK: 100
// MOVE: 50
// CARRY: 50
// ATTACK: 80
// RANGED_ATTACK: 150
// HEAL: 250
// CLAIM: 600
// TOUGH: 10

var num_job = function(creeps, job) {
    if(creeps.length < 1) {
        return 0
    } else if (job == "WORK") {
        var num = 0;
        for(var creep of creeps) {
            if(creep.is_worker()) {
                num += 1;
            }
        }
        return num
    } else if(job == "ATTACK") {
        var num = 0;
        for(var creep of creeps) {
            if(creep.is_attacker()) {
                num += 1;
            }
        }
        return num
    } else if(job == "HEAL") {
        var num = 0
        for(var creep of creeps) {
            if(creep.is_healer()) {
                num += 1;
            }
        }
        return num
    } else if(job == "RANGED_ATTACK") {
        var num = 0
        for(var creep of creeps) {
            if(creep.is_ranged_attacker()) {
                num += 1;
            }
        }
        return num
    } else if(job == "CLAIM") {
        var num = 0
        for(var creep of creeps) {
            if(creep.is_claimer()) {
                num += 1;
            }
        }
        return num
    }
}

class Order {
    constructor(dict, name) {
        this.order_for_calc = dict;
        this.name = name;
        this.has_order = true;
    }

    get cost() {
        return this.calc_cost()
    }

    calc_cost() {
        var cost = 0;
        var dict = this.order_for_calc;

        for(let value in dict) {
            if(value == "WORK" | value == "work") {
                cost += 100 * dict[value]; 
            } else if(value == "MOVE" | value == "move") {
                cost += 50 * dict[value];
            } else if(value == "ATTACK" | value == "attack") {
                cost += 80 * dict[value];
            } else if(value == "RANGED_ATTACK" | value == "ranged_attack") {
                cost += 150 * dict[value];
            } else if(value == "HEAL" | value == "heal") {
                cost += 250 * dict[value];
            } else if(value == "CLAIM" | value == "claim") {
                cost += 600 * dict[value];
            } else if(value == "TOUGH" | value == "tough") {
                cost += 10 * dict[value];
            } else if(value == "CARRY" | value == "carry") {
                cost += 10 * dict[value];
            } else {
                console.log("got unknown order!: ", value)
            }
        }
        return cost
    }

    get order() {
        return this.reshaped_order()
    }

    reshaped_order() {
        var dict = this.order_for_calc;
        var order = [];
        var bodies = ["WORK", "MOVE", "ATTACK", "HEAL", "RANGED_ATTACK", "CARRY", "CLAIM", "TOUGH"];

        for(let value in dict) {
            if (!bodies.includes(value)) {
                continue;
            }

            if(value == "WORK") {
                var job = WORK; 
            } else if(value == "ATTACK") {
                var job = ATTACK;
            } else if(value == "MOVE") {
                var job = MOVE;
            } else if(value == "HEAL") {
                var job = HEAL;
            } else if(value == "RANGED_ATTACK") {
                var job = RANGED_ATTACK;
            } else if(value == "CARRY") {
                var job = CARRY;
            // } else if(value == "CLAIM") {
            //     var job = CLAIM;
            } else if(value == "TOUGH") {
                var job = TOUGH;
            }
            for (let index = 0; index < dict[value]; index++) {
                order.push(job);
            }
        }
        return order
    }
}

export function loop() {

    var myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(i => i.my);
    var sources = utils.getObjectsByPrototype(prototypes.Source);
    var containers = utils.getObjectsByPrototype(prototypes.StructureContainer);
    var mySpawns = utils.getObjectsByPrototype(prototypes.StructureSpawn).filter(i => i.my);
    var enemyCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(i => !i.my);

    var num_worker = num_job(myCreeps, "WORK");
    var num_attacker = num_job(myCreeps, "ATTACK");
    var num_healer = num_job(myCreeps, "HEAL");
    var num_ranged_attacker = num_job(myCreeps, "RANGED_ATTACK");

    var order = null;
    console.log('num of attacker:',num_attacker);
    console.log('num of worker:',num_worker);
    console.log('num of ranged_attacker:', num_ranged_attacker)
    console.log('num of healer:', num_healer);

    if(num_worker < 3) {
        let order_draft = {"WORK": 2, "MOVE": 1, "CARRY": 1};
        console.log("lack of worker!")
        var order = new Order(order_draft, "worker"+num_worker);
        var cost = order.cost;
    } else if (num_attacker < 3) {
        console.log("lack of attacker!")
        let order_draft = {"ATTACK": 2, "MOVE": 1};
        var order = new Order(order_draft, "attacker"+num_attacker);
        var cost = order.cost;
    } else if (num_ranged_attacker < 2) {
        console.log("lack of ranged_attacker!")
        let order_draft = {"RANGED_ATTACK": 2, "MOVE": 1};
        var order = new Order(order_draft, "ranged_attacker"+num_ranged_attacker);
        var cost = order.cost;
    }

    if(order != null & mySpawns[0].store[constants.RESOURCE_ENERGY] < cost) {
        console.log("my spawn needs energy!: store:",mySpawns[0].store[constants.RESOURCE_ENERGY], ", cost:", cost);
    } else if(order != null) {
        console.log("order:", order.order, "name:", order.name);
        mySpawns[0].spawnCreep(order.order, order.name).object;
        // console.log(mySpawns[0].spawnCreep(order.order, "worker01"));
    }

    console.log('current tick:', utils.getTicks());

    if(myCreeps.length > 0) {
        myCreeps.forEach(function(creep, i){

            console.log("creep pos: ",creep.x, creep.y);
            if(creep.is_worker()) {
                console.log("creeps["+i+"]",creep.name,"is a worker.");


                if(creep.store[constants.RESOURCE_ENERGY] < creep.store.getCapacity(constants.RESOURCE_ENERGY)) {
                    console.log(creep.store[constants.RESOURCE_ENERGY]);
                    if(creep.harvest(sources[0]) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                } else {
                    if (creep.transfer(mySpawns[0], constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                        creep.moveTo(mySpawns[0]);
                    }
                }


            } else if(creep.is_attacker()) {

                console.log("creeps["+i+"]", creep.name, "is an attacker.");

                var distance = ((creep.x - enemyCreeps[0].x)**2 + (creep.y - enemyCreeps[0].y)**2 )**0.5;
                console.log("distance: ",distance);
                if (distance < 10 & creep.attack(enemyCreeps[0]) == constants.ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyCreeps[0]);
                }
            } else if(creep.is_ranged_attacker()) {

                console.log("creeps["+i+"]", creep.name, "is a ranged_attacker.");
                
                var distance = ((creep.x - enemyCreeps[0].x)**2 + (creep.y - enemyCreeps[0].y)**2 )**0.5;
                console.log("distance: ",distance);
                if (distance < 10 & creep.rangedAttack(enemyCreeps[0]) == constants.ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemyCreeps[0]);
                }
            }
        });
    }

    
}
