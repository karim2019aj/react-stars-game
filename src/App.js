import React, {  useState } from "react";
import './App.css';
import PlayNumber from "./components/PlayNumber";
import StarsDisplay from "./components/StarsDisplay";


const PlayAgain = props => (
	<div className="game-done">
     <h2 className="message" style={{ color: 'green'}}>You won!!</h2> 
	  <button onClick={props.onClick}>Play Again</button>
	</div>
);

const App = () =>{
  const  [stars, setStar] =useState(utils.random(1,9));
  const  [availableNums ,setAvailableNums] = useState(utils.range(1,9));
  const  [condidateNums , setaCondidatsNum] = useState([]);
  
  const resetGame = () => {
    setStar(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setaCondidatsNum([]);
  };

  // if the sum of possibles candidates bigger than num of stars
  const condidateNumsWrong = utils.sum(condidateNums) > stars;
  const gameIsOver = utils.sum(availableNums) === 0 ;
  const numberStatus = (number) => {
    //check if num is available or not
    if (!availableNums.includes(number)) {

      return 'used';
      
    }
    // check if sum of condidats wrong or not
    if (condidateNums.includes(number)) {
      return condidateNumsWrong ? 'wrong'  : 'candidate';
      
    }
    return 'available';

  }
  // button click logic
  const onNumberClick =(number , currentState) =>{
    //console.log("condidates nums "+condidateNums);
    //if the current number is used don't do any thing 
    if (currentState === "used") {
      return;
    }
    // condidat number
    const newCandidatNums = currentState ==='available' ?
     condidateNums.concat(number):  condidateNums.filter(cn => cn !== number);
    //check if newCandidatNums is not  a correct answer
    if (utils.sum(newCandidatNums) !== stars) {
        // set the state
        setaCondidatsNum(newCandidatNums);

    } else{
      // extract newCandidatNums from available nums 
     const newAvailableNums = availableNums.filter(
       n => !newCandidatNums.includes(n)
     ); 
     setStar(utils.randomSumIn(newAvailableNums,9));
     setAvailableNums(newAvailableNums);
     setaCondidatsNum([]);

    }
 
    
    
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
         
          {  gameIsOver ? <PlayAgain onClick={resetGame}/> :utils.range(1,stars).map(starId =><StarsDisplay key={starId} />) }
        </div>
        <div className="right">
         
              {utils.range(1,9).map(number=>
                    <PlayNumber 
                    status={numberStatus(number)}   
                    key={number} 
                    number={number}
                    onClick={onNumberClick}
                    />
                )}
        </div>
      </div>
      
    </div>
  );
}



// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default App;
