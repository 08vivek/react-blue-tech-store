import * as contentful from 'contentful';

export const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in the contenful terms.
    space : process.env.REACT_APP_SPACE_ID,
    // This is the access token for the space. Normally you get both ID and the token in the Contentfull web app.
    accessToken : process.env.REACT_APP_ACCESS_TOKEN 
});