import './config/env.js';

import httpServer from './config/httpServer.js';
import connectDB from './config/database.js';

import { PORT, MONGODB_URI } from './constants/env.js';

const bootstrap = async () => {
    await connectDB(MONGODB_URI);

    httpServer.listen(
        PORT,
        () => console.log(`server listen on port ${PORT}`)
        );
}

bootstrap();