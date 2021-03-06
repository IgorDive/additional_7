module.exports = function solveSudoku( matrix ) {
  //let nameTimer;
  //console.time( nameTimer );
  let newMatrix = JSON.parse( JSON.stringify( matrix ) ); 
  let elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];
  let arrOfExistingElemForCondition = [];
  let stackInsertedElem = [[0, 0, 0, 0]];
  let arrOfPossibleVariantsOfElem = [];
  let cuttedStackArr = [];
  let attempts = 0;
  let counterAttempts = 1;
  let cycleBreaker = false;
  let tempQueue = [];
  let elemFrequenceFiltered = [];
  let labelCheck = true;
  let flag = false;
  let counterOfBegin = 0;
  let counterOfStop = 0;
  let devtool = 0;
  
   
  while ( labelCheck === true ) {
    labelCheck = false;
    start();
    if ( flag ) break;
    if ( devtool > 84100 ) break;
  }
  
  //console.timeEnd( nameTimer );
  //console.log( devtool );

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
    let arrOfExistingElemForConditionMapped1 = [];
    let arrOfExistingElemForConditionMapped2 = [];
    
    for ( let c = 0; c < 9 - topElemOfElemFrequenceArr[1]; c++ ) {
      
      if ( cycleBreaker ) {
        break;
      }

      makeArrOfExistingElemForCondition(topElemOfElemFrequenceArr[0]);
      arrOfExistingElemForConditionMapped2 = arrOfExistingElemForCondition.map( (arrJ) => arrJ[2] );
      arrOfExistingElemForConditionMapped1 = arrOfExistingElemForCondition.map( (arrJ) => arrJ[1] );

 out: for ( let j = 0; j < newMatrix.length; j++ ){
        if ( arrOfExistingElemForConditionMapped2.some( (item) => { if ( j === item) return true } ) ) continue;
        for ( let i = 0; i < newMatrix[j].length; i++ ){
          if ( arrOfExistingElemForConditionMapped1.some( (item) => { if ( i === item) return true } ) || newMatrix[j][i] !== 0 || arrOfExistingElemForCondition.some( (arrJ) => { if ( arrJ[3] === Math.floor( i / 3 ) && arrJ[4] === Math.floor( j / 3 ) ) return true } ) ) continue;
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
    
    ++counterOfBegin;
    ++devtool;

    if ( counter < 9 - topElemOfElemFrequenceArr[1] ) {
      tempQueue = stackInsertedElem.splice( -1 );
      tempQueue.forEach( arr => newMatrix[arr[2]][arr[1]] = 0 );
      counterAttempts = stackInsertedElem[stackInsertedElem.length - 1][3];
      attempts = counterAttempts;
      cycleBreaker = false;
      labelCheck = true;
      elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];

      return true;
    }
     
    cuttedStackArr = stackInsertedElem.filter( arr => arr[0] === topElemOfElemFrequenceArr[0] && true );

    if ( arrOfPossibleVariantsOfElem.filter( arr => arr[0][0] === topElemOfElemFrequenceArr[0] ).length ) {
      while ( arrOfPossibleVariantsOfElem[arrOfPossibleVariantsOfElem.length - 1][0][0] !== topElemOfElemFrequenceArr[0] ) {
        arrOfPossibleVariantsOfElem.pop();
      }
      
      if ( arrOfPossibleVariantsOfElem.some( arr => arr.every( subArr => cuttedStackArr.some( cutArr => subArr[1] === cutArr[1] && subArr[2] === cutArr[2] ) ) ) ) {
        tempQueue = stackInsertedElem.splice( -1 );
        tempQueue.forEach( arr => newMatrix[arr[2]][arr[1]] = 0 );
        counterAttempts = stackInsertedElem[stackInsertedElem.length - 1][3];
        attempts = counterAttempts;
        cycleBreaker = false;
        labelCheck = true;
        elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];
        return true;
      }
    }

    /*
    if ( counterOfBegin > 3000 ) {
      newMatrix = JSON.parse( JSON.stringify( matrix ) ); 
      arrOfPossibleVariantsOfElem = arrOfPossibleVariantsOfElem.filter( arr => arr[0][0] === arrOfPossibleVariantsOfElem[0][0][0] && true );
      attempts = ++counterOfStop;
      elemFrequence = [[1, 0],[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],[7, 0],[8, 0],[9, 0]];
      arrOfExistingElemForCondition = [];
      stackInsertedElem = [[0, 0, 0, 0]];
      cuttedStackArr = [];
      counterAttempts = 1;
      cycleBreaker = false;
      tempQueue = [];
      elemFrequenceFiltered = [];
      labelCheck = true;
      flag = false;
      counterOfBegin = 0;
      devtool = 0;

      return true;
    }
*/

    arrOfPossibleVariantsOfElem.push( cuttedStackArr );

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
