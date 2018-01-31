import React from 'react';
import pinyin from 'pinyin';


export const groupSectionAndRows =(dataSource,dataList)=>{
    const dataBlob = {};
    const sectionIDs = [];
    const rowIDs = [];

    dataList.forEach((item, index)=>{
        dataBlob[item.id] = item;
        let itemFirstLetter = pinyin(item.name,{style: pinyin.STYLE_FIRST_LETTER})[0][0].toLocaleUpperCase();
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
        let itemFirstLetter = pinyin(item.name,{style: pinyin.STYLE_FIRST_LETTER})[0][0];
        let sectionIndex = sectionIDs.indexOf(itemFirstLetter.toLocaleUpperCase());
        if(sectionIndex !== -1){
            rowIDs[sectionIndex].push(item.id);
        }else{
            rowIDs[sectionIDs.indexOf("#")].push(item.id);
        }
    });

    return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

