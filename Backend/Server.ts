import express ,{Request , Response} from 'express';
import dotenv from 'dotenv';


dotenv.config();

// Express code apply it !
const app = express();
const port = process.env.PORT;

app.get('/', (req:Request, res:Response)=>{
    res.send("Backend worked fine")
})



