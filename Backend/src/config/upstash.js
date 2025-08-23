
import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'

import dotenv from "dotenv";

dotenv.config();

//create a ratelimiter that allows only 100 req per 60 secs;
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '60 s')
})

export default rateLimit;
