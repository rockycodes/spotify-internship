// Question 1 -- sortByStrings(s, t): Sort the letters in the string s by the order they occur in the string t.You can assume t will not have repetitive characters.For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw".For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".

function sortByStrings(s, t){
  let newStr = ""
  //loop through the letters in t first because that's where the order matters
  for (let i=0; i<t.length; i++){
    //loop through the letters in s to find the one that matches the place you are in t
    for (let j=0; j<s.length; j++){
      //once you find the match, add it to newStr
      if (t[i] === s[j]){
        newStr += s[j]
      }
    }
  }
  return newStr
}

console.log(sortByStrings("weather", "therapyw"))
console.log(sortByStrings("good", "odg"));