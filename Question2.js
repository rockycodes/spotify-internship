// Question 2 -- decodeString(s): Given an encoded string, return its corresponding decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is repeated exactly k times.Note: k is guaranteed to be a positive integer.

// For s = "4[ab]", the output should be decodeString(s) = "abababab"
// For s = "2[b3[a]]", the output should be decodeString(s) = "baaabaaa"

function decodeStrings(str) {
  let numStack = []
  let charStack = []
  let tempArr = []
  let newStr = ""
  for (let i = 0; i < str.length; i++) {
    //if it's a number, push it onto the num stack
    if (47 < str.charCodeAt(i) && str.charCodeAt(i) < 58) {
      numStack.push(+str[i])
    }
    //if it's a closing bracket, pop the things off and deal with them
    else if (str[i] === "]") {
      //pop off values and add them to the char string until you reach a "["
      while (charStack[charStack.length - 1] !== "[") {
        tempArr.push(charStack.pop())
        //now all the characters between brackets are on the temp string in reverse
      }
      //pop off the opening bracket
      charStack.pop()
      //set num for use in the for loop below
      let num = numStack.pop()
      //put the characters in order (they are reversed in the tempArr)
      let tempStr = tempArr.reverse().join("")
      //add anything being held on the newStr to the newly created tempStr
      tempStr = tempStr + newStr
      //reset the newStr so can rebuild it below
      newStr = ""
      //reset the tempArr
      tempArr = []
      //and the tempStr to the newStr num times
      for (let j = 0; j < num; j++) {
        newStr += tempStr
      }
    }
    //otherwise, push it on the charStack
    else charStack.push(str[i])
  }
  return newStr;
}

console.log(decodeStrings('4[ab]'))
console.log(decodeStrings('3[b2[ca]]'));

