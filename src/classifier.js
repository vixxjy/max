// const input = require('../src/inputs/input');
/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
const moment = require("moment");


let yearDifference = (x, y) => {
  return Math.abs(moment(y).diff(moment(x), 'years'))
}

let findAge = birthdate => {
  if (moment(birthdate).isValid()) {
    return Math.abs(moment().diff(moment(birthdate), 'years'));
  }
}

function classifier(input) {
  // Your code should go here.
  if (input.length == 0) {
    return { noOfGroups: 0 };
  }
  
  const displayFormate = {
    noOfGroups: 1,
    group1: {
      members: [],
      oldest: 0,
      sum: 0,
      regNos: []
    }
  }

  let sortedInput = input.slice().sort((a, b) => {
    return new Date(b.dob) - new Date(a.dob);
  });

  let groupBy = sortedInput.reduce((groups, students) => {
    const { dob, regNo } = students;
    const age = findAge(dob);

      let groupings = groups[`group${groups.noOfGroups}`];
      let lastStudent = groupings.members[groupings.members.length - 1];

        if (groupings.members.length === 3 || (!!lastStudent && yearDifference(lastStudent.dob, dob) > 5)) {
          const members = [{ ...students, dob, age }];
          const newGroupName = `group${++groups.noOfGroups}`;
          groups[newGroupName] = { members, regNos: [parseInt(regNo, 10)], oldest: age, sum: age };
        }
        else {
          groupings.sum += age;
          groupings.regNos.push(parseInt(regNo, 10));
          groupings.regNos.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
          groupings.members.push({ ...students, age });
          groupings.oldest = Math.max(age, groupings.oldest);
        }

      return groups
  }, displayFormate)

  return groupBy;
// console.log(groupBy);
  // console.log(sortedInput);

}
// classifier(input)
module.exports = classifier;
