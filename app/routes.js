var user = require('./models').userm;
var evnt = require('./models').eventm;
var crypto = require('crypto');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var googlestrategy = require('passport-google-oauth2').Strategy;
var multer = require('multer');
var func = require('./func');
func.local(passport,LocalStrategy,user);
func.google(passport,googlestrategy,user);
func.serial(passport);
func.deserial(passport);
var path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
         cb(null, file.originalname.replace(path.extname(file.originalname), "") + path.extname(file.originalname));
  }
})
module.exports = function(app){

	app.use(session({
	  secret: 'secrettexthere',
	  saveUninitialized: true,
	  resave: true,
	  
	}));
	app.use(passport.initialize());
    app.use(passport.session());
    var upload = multer({ storage: storage });
	app.get('/signup',function(req,res){
		res.render('../public/views/signup');
    })

    app.get('/',function(req,res){
        res.sendFile(path.resolve(__dirname+'/../public/views/login.html'));
    })

    


    app.post('/signup',function(req,res){
        console.log(req.body);
    	var username = req.body.username;
    	var password = req.body.password;
        func.signup(user,username,password);
        res.redirect('/login');

    })
    /*app.get('/login',function(req,res){
    	console.log(req.isAuthenticated());
    	if(req.isAuthenticated())
    		res.redirect('/home');
    	else
    		res.render('login');

    });*/

    app.post('/auth/login',passport.authenticate('local-login',{failureRedirect:'/loginfail'}),function (req, res) {
	  // console.log( 'login : '+ req.session.passport.user);
	   res.json(req.session.passport.user);
	   
    });

    app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

	app.get('/auth/google/cb',
	passport.authenticate('google', { failureRedirect: '/loginfail' }),
	function(req, res) {
	  // Successful authentication, redirect home.
	  res.redirect('/home');
	});
  	

  	app.get('/auth/cuser',function(req,res){
        res.json(req.session.passport.user);
    });
    app.get('/login',function(req,res){
        res.sendFile(path.resolve(__dirname+'/../public/views/login.html'))
    })

    app.get('/home',function(req,res){

    	//res.render('home');
        console.log(req.session.passport.user);

       
        res.sendFile(path.resolve(__dirname+'/../public/views/home.html'))
      
    })

    app.get('/api/udata/:uname',function(req,res){
        user.findOne({username:req.params.uname},function(err,data){
            if(err) throw err;
            console.log(data);
            res.send(JSON.stringify(data));
        })
    })

    app.get('/api/getevents',function(req,res){
        evnt.find({},function(err,data){
            if(err) throw err;
            console.log(data);
            res.send(JSON.stringify(data));

        })
    })

    app.get('/api/getmyevents',function(req,res){
        user.find({username:req.session.passport.user.username},function(err,data){
            if(err) throw err;
            res.send(JSON.stringify(data))
        })
    })

    app.get('/api/invite',function(req,res){
        user.find({username:req.session.passport.user.username},function(err,data){
            if(err) throw err;
            res.send(JSON.stringify(data));
        })
    })



    app.post('/api/addevent/',function(req,res){
        console.log(req);
        //var eventn = req.body.params.name;
        //var eventp = req.body.params.place;
        //console.log(eventn);
        //console.log(eventp);
        //var newevent = new eventi({name:eventn,place:eventp});
        /*newevent.save(function(err,data){
            if(err) throw err;
            console.log(data);
        })*/
    })
    


    app.post('/uploads/public',upload.single('file'),function(req,res){
        console.log(req.session.passport.user.username);
        console.log(req.body);
        console.log(req.file);
        
        var details = {
            name : req.body.name,
            place : req.body.place,
            sdate : req.body.sdate,
            edate : req.body.edate,
            stime : req.body.stime,
            etime : req.body.etime,
            imgloc: req.file.originalname,
            desc:req.body.desc,
            public:1,
            private:0
        }
        var use = req.session.passport.user.username;
        var pubevent = new evnt(details);
        pubevent.save(function(data){
             console.log("placed successfully..");
             user.findOne({username:use},function(err,data){
                if(err) throw err;
                console.log(data);
                data.events.push(details);
                data.save(function(err,data){
                    if(err) throw err;
                    console.log(data);
                    
                })
            })

        })

})
        
    

    app.post('/uploads/private',upload.single('file'),function(req,res){
        console.log("invites are:")
        
        var invi = req.body.invites;
        console.log(req.file);
        res.json({success: true});
        use = req.session.passport.user.username;
        var details = {
            name : req.body.name,
            place : req.body.place,
            sdate : req.body.sdate,
            edate : req.body.edate,
            stime : req.body.stime,
            etime : req.body.etime,
            imgloc: req.file.originalname,
            desc:req.body.desc,
            private:1,
            public:0
        }

        user.findOne({username:use},function(err,data){
                if(err) throw err;
                console.log(data);
                data.events.push(details);
                data.save(function(err,data){
                    if(err) throw err;
                    console.log(data);
                    console.log(req.body.invites);
                    console.log(typeof(req.body.invites));
                    var inviarr = invi.split(',');
                    for(var i = 0; i < inviarr.length; i++) {
                       // Trim the excess whitespace.
                       inviarr[i] = inviarr[i].replace(/^\s*/, "").replace(/\s*$/, "");
                       // Add additional code here, such as:
                       console.log(inviarr[i]);
                            user.findOne({username:inviarr[i]},function(err,data){
                            if(err) throw err;
                            console.log(data);
                            if(data){
                                data.invited.push(details);
                                  data.save(function(err,data){
                                    if(err) throw err;
                                    console.log(data);
                                    
                                  })  
                            }
                            
                        })



                    }


                })
            })
        


        
    })

    app.get('*', function(req, res) {
            if(req.isAuthenticated())
            res.sendFile(path.resolve(__dirname+'/../public/views/home.html')); // load our public/index.html file
             else
            res.redirect('/home');

        });


}
