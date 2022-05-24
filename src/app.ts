import express from 'express';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';

/** Reference
 * 
 * https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
 */

import { getDBPath, getListeningPort, getExpresssessionsecret,getSecurecoockies } from './config';


const app = express();


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Trust the proxy
app.set('trust proxy', 1)

// Make all necessary node_module files available
app.use('/static/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/static/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/static/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/static/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/static/js', express.static(__dirname + '/node_modules/showdown/dist'));
app.use('/static/js', express.static(__dirname + '/node_modules/js-autocomplete'));
app.use('/static/css', express.static(__dirname + '/node_modules/js-autocomplete'));

// Make assets available
app.use('/static', express.static('static'));
app.use('/', express.static('public'));

// Middleware
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ 
  secret: getExpresssessionsecret(), 
  resave: false, 
  saveUninitialized: false,
  // set secure to true if possible (i.e., when using HTTPS)
  cookie: {secure: getSecurecoockies(), maxAge: 7776000000}
}));

// Initialize Passport and restore authentication state from the session.
app.use(passport.initialize());
app.use(passport.session());


app.get('/', 
    ensureLoggedIn(),
    (req, res) => {    
        res.send('Hello World!');
});

app.listen(getListeningPort(), '0.0.0.0', () =>{
    return console.log("Ready. DBPATH="+getDBPath()+ " dir="+__dirname);
});
