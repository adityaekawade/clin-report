const koa = require('koa');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb', extended: true}));

router.post('/analysistoreport/create-pdf', async (ctx) => {
  const params = JSON.parse(ctx.request.body);

  //Creates a json file from the object received from the request.
  // The path of this file is sent as argument to the sh script.
  fs.writeFile('analysis.json', params, err => {
    if (err) {
        console.log(err)
    }
  })

  await handle(ctx, 'clinreport.sh', ['analysis.json']);
  //Get the created file and send it back to the user.
});
