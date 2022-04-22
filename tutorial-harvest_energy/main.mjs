import { getObjectsByPrototype } from '/game/utils';
import { Creep, Source, StructureSpawn } from '/game/prototypes';
import { RESOURCE_ENERGY, } from '/game/constants';
import { } from '/arena';
import { prototypes, utils, constants, } from '/game';

Creep.prototype.is_attacker = function() {
    if (this.body.some( bodyPart => bodyPart.type == ATTACK )) {
        return true
    }
    else {
        return false
    }
}

Creep.prototype.is_worker = function() {
    if (this.body.some( bodyPart => bodyPart.type == WORK)) {
        return true
    }
    else {
        return false
    }
}

Creep.prototype.is_healer = function() {
    if (this.body.some(bodyPart => bodyPart.type == HEAL)) {
        return true
    }
    else {
        return false
    }
}

Creep.prototype.is_ranged_attacker = function() {
    if (this.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
        return true
    }
    else {
        return false
    }
}

Creep.prototype.is_claim = function() {
    if (this.body.some(bodyPart => bodyPart.type == CLAIM)) {
        return true
    }
    else {
        return false
    }
}

export function loop() {

    var myCreeps = getObjectsByPrototype(Creep).filter(i => i.my);

    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
        
    // }
    var source = getObjectsByPrototype(Source)[0];
    var spawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);

    console.log(myCreeps[0].store.getFreeCapacity());
    console.log(myCreeps[0].stoer.FreeEnergy());

    myCreeps.forEach(function(creep, i){
        if(creep.is_worker) {
            console.log("creeps[",i, "]this is a worker creep.");

            if(creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
                if(creep.harvest(source) == constants.ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                if (creep.transfer(spawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            }
        }
    });
}
