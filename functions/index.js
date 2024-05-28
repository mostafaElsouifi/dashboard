const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.deleteUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.')
  }

  // Check if the requesting user is an admin
  const uid = context.auth.uid
  const userRecord = await admin.auth().getUser(uid)
  if (!userRecord.customClaims || !userRecord.customClaims.admin) {
    throw new functions.https.HttpsError('permission-denied', 'The function must be called by an admin user.')
  }

  const { uidToDelete } = data

  try {
    await admin.auth().deleteUser(uidToDelete)
    return { message: `User with UID ${uidToDelete} has been successfully deleted.` }
  } catch (error) {
    throw new functions.https.HttpsError('unknown', error.message)
  }
})
