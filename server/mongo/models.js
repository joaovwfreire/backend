import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  id: { type: Number, index: true },
  email: { type: String, index: true },
  birthDay: { type: Date },
  registration: { type: Number },
  challengePrizes: { type: Number },
  gamePrizes: { type: Number }
})


const GameAccountsSchema = mongoose.Schema({
  userGameId: { type: String, index: true },
  userId: { type: Number, index: true },
  gameId: { type: Number },
  linKTimestamp: { type: Number },
  totalMatches: { type: Number },
  wins: { type: Number },
  losses: { type: Number },
  draws: { type: Number },
  prizesWon: { type: Number },

})

export const User = mongoose.models.User || mongoose.model('Users', UserSchema);
export const GameAccounts = mongoose.model('GameAccounts', GameAccountsSchema);
