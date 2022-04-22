import { getObjectsByPrototype } from '/game/utils';
import { Creep } from '/game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from '/game/constants';
import { } from '/arena';

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

    // console.log(Creep)


    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    // var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);

    // const is_attacker = element => element.type == ATTACK;
    // const is_healer = element => element.type == HEAL;
    // const is_worker = element => element.type == WOKR;

    for (var creep of myCreeps) {
         console.log(creep.is_attacker())
    }

    // if (myCreeps[0].body.some(is_attacker)) {
    //     console.log("this creep is an attacker!")
    // }

    // for(var creep of myCreeps) {
    //     if(creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
    //         if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(enemyCreep);
    //         }
    //     }
    //     if(creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
    //         if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(enemyCreep);
    //         }
    //     }
    //     if(creep.body.some(bodyPart => bodyPart.type == HEAL)) {
    //         var myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
    //         if(myDamagedCreeps.length > 0) {
    //             if(creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(myDamagedCreeps[0]);
    //             }
    //         }
    //     }
    // }
    // console.log(myCreeps[0].body);
    // console.log(myCreeps[1].body);
    // Your code goes here
}
