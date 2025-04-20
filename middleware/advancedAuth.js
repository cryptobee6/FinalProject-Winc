import { auth } from 'express-oauth2-jwt-bearer';


const authMiddleware = auth({
  audience: 'https://back-end-api', // e.g. https://book-store-api
  issuerBaseURL: `https://dev-yjkg1u21amsh55g8.us.auth0.com/oauth/token/`,
});

export default authMiddleware;
