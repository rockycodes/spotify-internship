// Question 3 -- changePossibilities(amount, amount): Your quirky boss collects rare, old coins.They found out you're a programmer and asked you to solve something they've been wondering for a long time. 

// Write a function that, given an amount of money and an array of coin denominations, computes the number of ways to make the amount of money with coins of the available denominations.

//   Example: for amount = 4(4¢) and denominations = [1, 2, 3](1¢, 2¢ and 3¢), your program would output 4—the number of ways to make 4¢ with those denominations:

// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢

function changePossibilities(target, denoms) {
  //Sort and filter out duplicates.
  //Only need to do this once, so create a separate function that can be called recursively.
  let sortedDenoms = [];
  denoms.sort((a, b) => a - b).forEach((num) => {
    if (sortedDenoms.indexOf(num) === -1) sortedDenoms.push(num)
  })
  return sortedChangePossibilities(target, sortedDenoms)
}

function sortedChangePossibilities(target, sortedDenoms, memo = {}) {
  //Initiate a counter.
  let counter = 0;
  //Create a key with the target value and the array of denoms. Must include the array in the key, because there will be multiple recursive calls on the same value with a different array of values (eg. 4, [1,2,3] will be different than 4, [1,2])
  let key = `${target}, [${sortedDenoms}]`
  //BASE CASES: If the target of the recursive call equals the smallest denom then you know it will subtract to 0 on the next round. Can just return 1 to add to the counter. Also need to account for if the target is already 0 because subtracting a larger number got it there.
  if (target === sortedDenoms[0] || target === 0) {
    return 1;
  }
  //If you have overshot 0 or if the target number is smaller than the smallest number you know this arrangment doesn't work. Don't add 1 to the counter.
  else if (target < sortedDenoms[0]) {
    return 0;
  } 
  else {
    //Want to subtract each denomination from the target number, starting with the largest, and then do the same recursively on all remainders.
    for (let i = sortedDenoms.length - 1; i >= 0; i--) {
      let remainder = target - sortedDenoms[i]
      //Check if this value/denoms combo already exists in your memo (you have already computed it) and use that if it does.
      if (memo[key]) {
        counter += memo[key]
        //Break out of the loop to prevent duplicate counts.
        break
      }
      //If you have not already computed this value/denoms combo, call the function recursively on the remainder and slice the denoms array to avoid duplication (eg. If you have already done 3-2-2, you don't want to also count 2-3-2. This solution avoids that by chopping the numbers off the array once all solutions have been found that start with that number.)
      else {
        counter += sortedChangePossibilities(remainder, sortedDenoms.slice(0, i + 1), memo)
      }
    }
  }
  //If the memo key does not already exist, add it.
  if (!memo[key]) memo[key] = counter
  return counter;
}

//I wrote a non-memoized version of this and wanted to test how much faster the memoized version is. It's a lot faster! I think it was a difference of about 4000 miliseconds vs 15 miliseconds with a target value of 1,000 and the denominations [1,2,3]!
var start = new Date().getTime();
console.log("memoChange", changePossibilities(1000, [1, 2, 3]))
var end = new Date().getTime();
console.log("time in miliseconds...", end - start);