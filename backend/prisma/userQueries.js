const { PrismaClient } = require('@prisma/client');
const { Validator, appError } = require('../lib/mainFunctions');
const prisma = new PrismaClient();

module.exports.getUserByEmail = (email) => prisma.userdata.findUnique({
  where: {
    email: email,
  }
});

class ThrowError {
  constructor(error) {}
}

module.exports.getUserByEmail = class {
  constructor(email) {
    const user = prisma.userdata.findUnique({
      where: {
        email: this.email
      }
    })
  }
}

// module.exports.GetUserByEmailValidator = class extends Validator {
//   constructor(email){}

//   validate() {
//     const user = prisma.userdata.findUnique({
//       where: {
//         email: email,
//       }
//     });
//     if (!user) {
//       this.throwError()
//     }
//     return true
//   }

//   throwError() {
//   throw new ValidationError("Email-Adresse ist bereits vergeben.", 400);
//   }
// }