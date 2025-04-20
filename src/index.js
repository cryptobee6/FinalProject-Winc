import express from "express";
import amenitiesRouter from '../routes/amenities.js';
import bookingsRouter from '../routes/bookings.js';
import hostsRouter from '../routes/hosts.js';
import propertiesRouter from '../routes/properties.js';
import reviewsRouter from '../routes/reviews.js';
import usersRouter from '../routes/users.js';
import loginRouter from '../routes/login.js';
import log from "../middleware/logMiddleware.js";
import errorHandler from '../middleware/errorHandler.js';
import * as Sentry from '@sentry/node';


import 'dotenv/config';


const app = express();

//Sentry
Sentry.init({
  dsn: "https://3b03bd2ffd447b4877300c624df8aa47@o4508935791312896.ingest.de.sentry.io/4509102482980944",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Performance Monitoring
  tracesSampleRate: 1.0,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


// Global middleware
app.use(log);
app.use(express.json())

// Resource routes
app.use('/amenities', amenitiesRouter);
app.use('/bookings', bookingsRouter);
app.use('/hosts', hostsRouter);
app.use('/properties', propertiesRouter);
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);

// Login
app.use('/login', loginRouter);

// Trace errors
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler)

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


