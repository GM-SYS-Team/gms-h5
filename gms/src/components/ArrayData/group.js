import React from 'react';
import '../../utils/pinyin';


export const groupSectionAndRows =(dataSource,dataList)=>{
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    dataList.forEach((item, index)=>{
        dataBlob[item.id] = item;
        let itemFirstLetter = window.Utils.CSpell.getSpell(item.name.substring(0,1),function(charactor,spell){ return spell[1]}).substring(0,1).toLocaleUpperCase();
        let hasSection = false;
        sectionIDs.forEach((item, index) => {
            if(itemFirstLetter == item){
                hasSection = true;
            }
        });
        if(!hasSection){
            if((itemFirstLetter>='a'&&itemFirstLetter<='z')||(itemFirstLetter>='A'&&itemFirstLetter<='Z')){
                sectionIDs.push(itemFirstLetter);
            }
        }
    });
    sectionIDs.push("#");

    sectionIDs.forEach((item, index) => {
        dataBlob[item] = item;
        rowIDs[index] = [];
    });

    dataList.forEach((item, index)=>{
        dataBlob[item.id] = item;
        let itemFirstLetter = window.Utils.CSpell.getSpell(item.name.substring(0,1),function(charactor,spell){ return spell[1]}).substring(0,1).toLocaleUpperCase();
        let sectionIndex = sectionIDs.indexOf(itemFirstLetter.toLocaleUpperCase());
        if(sectionIndex !== -1){
            rowIDs[sectionIndex].push(item.id);
        }else{
            rowIDs[sectionIDs.indexOf("#")].push(item.id);
        }
    });

    return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

