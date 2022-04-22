import { getObjectsByPrototype } from '/game/utils';
import { Creep, Flag, StructureSpawn } from '/game/prototypes';
import { MOVE } from '/game/constants';
import { constants } from '/game';

var creep1, creep2;

export function loop() {
    var mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    var flags = getObjectsByPrototype(Flag);

    console.log(mySpawn.store[constants.RESOURCE_ENERGY]);

    //  this is a bad statement somehow.
    // if(!creep1) { 
    //     creep1 = mySpawn.spawnCreep([MOVE]).object;
    //     creep1.target = flags[0];
    // }
    // if(!creep2) {
    //     creep2 = mySpawn.spawnCreep([MOVE]).object;
    //     creep2.target = flags[1];
    // }
    // if(creep1) {
    //     creep1.moveTo(creep1.target);
    // }
    // if(creep2) {
    //     creep2.moveTo(creep2.target);
    // }

    // this is also a bad statement somehow.
    // if(!creep1) {
    //     creep1 = mySpawn.spawnCreep([MOVE]).object;
    //     creep1.target = flags[0];
    // } else {
    //     creep1.moveTo(creep1.target);
    // }
    //
    // else の後に if 分岐あると失敗する
    //
    // if(!creep2) { -> will fail
    //     creep2 = mySpawn.spawnCreep([MOVE]).object;
    //     creep2.target = flags[1];
    //     console.log(creep2)
    // } else {
    //     creep2.moveTo(creep2.target);
    // }

    if(!creep1) {
        creep1 = mySpawn.spawnCreep([MOVE], 'Worker1', {
            memory: {role: 'harvester'}
        }).object;
    } else {
        console.log("creep1:",creep1);
        console.log(creep1.name);
        creep1.moveTo(flags[0]);

        if(!creep2) {
            creep2 = mySpawn.spawnCreep([MOVE], "worker2").object;
        } else {
            console.log(creep2.name);
            creep2.moveTo(flags[1]);
        }
    }
}