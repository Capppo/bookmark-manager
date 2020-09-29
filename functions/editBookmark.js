const { EDIT_BOOKMARK } = require('./utils/queries');
const { getClient } = require('./utils/client');

exports.handler = async (event, context, callback) => {
  try {
    if (event.httpMethod !== 'PUT') {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: 'only PUT http method is allowed.'
        })
      };
    }
    //console.log("<editBookmark> Event body ...: ", event.body)
    const { _id: id, title, url, tag, createdAt, lastEdit } = JSON.parse(event.body);
    const variables = { id, title, url, tag, createdAt, lastEdit };
    variables.lastEdit = Date.now()
    const client = getClient({ method: 'PUT' });
    const { data } = await client.mutate({
      mutation: EDIT_BOOKMARK,
      variables
    });
    const result = data.createBookmark;
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    //console.log("<editBookmark> Error ...: ", error)
    return {
      statusCode: 500,
      body: JSON.stringify(
        error.message
      )
    };
  }
};