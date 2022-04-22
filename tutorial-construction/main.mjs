import {prototypes, utils, constants, } from '/game';

prototypes.Creep.prototype.is_worker = function() {
    if (this.body.some( bodyPart => bodyPart.type == WORK)) {
        return true
    }
    else {
        return false
    }
}

export function loop() {

    var myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(i => i.my);
    var sources = utils.getObjectsByPrototype(prototypes.Source);
    var containers = utils.getObjectsByPrototype(prototypes.StructureContainer);

    // console.log(containers)
    console.log("free capacity: ",myCreeps[0].store.getFreeCapacity(constants.RESOURCE_ENERGY));
    console.log("capacity: ",myCreeps[0].store.getCapacity(constants.RESOURCE_ENERGY));

    if(myCreeps[0].store.getFreeCapacity(constants.RESOURCE_ENERGY) < 10) {
        console.log("go to any construction site!")
    }

    const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);

    if(!myCreeps[0].store[constants.RESOURCE_ENERGY]) {

        if(myCreeps[0].withdraw(containers[0], constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            myCreeps[0].moveTo(containers[0]);
        }
    } else if (!constructionSite) {
        utils.createConstructionSite(50, 55, prototypes.StructureTower);
    } else {
        myCreeps[0].moveTo(constructionSite);
    }
    // myCreeps.forEach(function(creep, i) {

    //     if(creep.is_worker) {

    //         console.log('creeps[',i,'] is a worker.')

    //         if(!creep.store[constants.RESOURCE_ENERGY]){
    //             const container = utils.findClosestByPath(creep, utils.getObjectsByPrototype(prototypes.StructureContainer));
    //             console.log("creep doesnt store energy")
    //             if (creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(container);
    //             }
    //         } else {
    //             console.log("creep store some energy")
    //             const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);
    //             if(!constructionSite) {
    //                 utils.createConstructionSite(50, 55, prototypes.StructureTower);
    //             } else {
    //                 if (creep.build(constructionSite) == constants.ERR_NOT_IN_RANGE) {
    //                     console.log("creep is out of range")
    //                     creep.moveTo(constructionSite);
    //                 }
    //             }
    //         }
    //     }
        
    // });
    // Your code goes here
}
