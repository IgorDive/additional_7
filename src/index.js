module.exports = function solveSudoku( matrix ) {
  let newMatrix = JSON.parse( JSON.stringify( matrix ) ); 
  let elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];
  let arrOfExistingElemForCondition = [];
  let stackInsertedElem = [[0, 0, 0, 0]];
  let attempts = 0;
  let counterAttempts = 1;
  let cycleBreaker = false;
  let tempQueue = [];
  let elemFrequenceFiltered = [];
  let labelCheck = true;
  let flag = false;
  let devtool = 0;
  
   
  while ( labelCheck === true ) {
    labelCheck = false;
    start();
    if ( flag ) break;
  }
  
  return newMatrix;
  
  
  function start() {
    newMatrix.forEach( (item) => {
      item.forEach( (itm) => {
        switch(itm) {
          case 1: elemFrequence[0][1]++;
          break;
          case 2: elemFrequence[1][1]++;
          break;
          case 3: elemFrequence[2][1]++;
          break;
          case 4: elemFrequence[3][1]++;
          break;
          case 5: elemFrequence[4][1]++;
          break;
          case 6: elemFrequence[5][1]++;
          break;
          case 7: elemFrequence[6][1]++;
          break;
          case 8: elemFrequence[7][1]++;
          break;
          case 9: elemFrequence[8][1]++;
        }
      } );
    } );
    
    elemFrequence.sort( (a, b) => b[1] - a[1] );

    elemFrequenceFiltered = elemFrequence.filter( arrElem => arrElem[1] < 9 );

    for ( let y = 0; y < elemFrequenceFiltered.length; y++ ) {
      if ( solveSud( elemFrequenceFiltered[y] ) ) break;
    }
    
    if ( !labelCheck ) flag = true;
    labelCheck = true;
  }


  function solveSud(topElemOfElemFrequenceArr) {
    let counter = 0;
    
    for ( let c = 0; c < 9 - topElemOfElemFrequenceArr[1]; c++ ) {
      
      if ( cycleBreaker ) {
        break;
      }

      makeArrOfExistingElemForCondition(topElemOfElemFrequenceArr[0]);

 out: for ( let j = 0; j < newMatrix.length; j++ ){
        if ( arrOfExistingElemForCondition.map( (arrJ) => arrJ[2] ).some( (item) => { if ( j === item) return true } ) ) continue;
        for ( let i = 0; i < newMatrix[j].length; i++ ){
          if ( arrOfExistingElemForCondition.map( (arrJ) => arrJ[1] ).some( (item) => { if ( i === item) return true } ) || newMatrix[j][i] !== 0 || arrOfExistingElemForCondition.some( (arrJ) => { if ( arrJ[3] === Math.floor( i / 3 ) && arrJ[4] === Math.floor( j / 3 ) ) return true } ) ) continue;
          if ( attempts ) { 
            if ( attempts === 1 ) counterAttempts++;
            cycleBreaker = true;
            attempts--;
            continue; 
          }  
          stackInsertedElem[stackInsertedElem.length - 1][3] = counterAttempts;
          counterAttempts = 1;
          stackInsertedElem.push( [topElemOfElemFrequenceArr[0], i, j, counterAttempts] );
          newMatrix[j][i] = topElemOfElemFrequenceArr[0];
          cycleBreaker = false;
          counter++;
          break out;
        }
      }
    }

    if ( counter < 9 - topElemOfElemFrequenceArr[1] ) {
      tempQueue = stackInsertedElem.splice( -1 );
      tempQueue.forEach( arr => newMatrix[arr[2]][arr[1]] = 0 );
      counterAttempts = stackInsertedElem[stackInsertedElem.length - 1][3];
      attempts = counterAttempts;
      cycleBreaker = false;
      ++devtool;
      labelCheck = true;
      elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];
      return true;
    }
    return ( labelCheck )? true: false;
  }

  function makeArrOfExistingElemForCondition(elemFrequenceI) {
    arrOfExistingElemForCondition = [];
    for ( let j = 0; j < newMatrix.length; j++ ) {
      for ( let i = 0; i < newMatrix[j].length; i++ ) {
        if ( elemFrequenceI === newMatrix[j][i] ) arrOfExistingElemForCondition.push( [elemFrequenceI, i, j, Math.floor( i / 3), Math.floor( j / 3)] );
      }
    }
  };

};