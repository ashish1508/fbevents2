var crypto = require('crypto');

function sha512(password, salt){
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        pwdhash:value
    };
};

function genrandomstring(){
    return crypto.randomBytes(Math.ceil(15/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,15);   /** return required number of characters */
 }



module.exports = {
		
	local : function (passport,LocalStrategy,user){
				passport.use('local-login', new LocalStrategy({usernameField:"username", passwordField:"password"},
				    function (username, password, done) {
				      //console.log(username);
				      user.findOne({username:username},function(err,data){
				        if(err)
				        return done(err);
				        if(!data)
				        return done(null,false);
				        if(sha512(password,data.salt).pwdhash===data.password){
				          console.log(data);
				          return done(null,data);
				        }
				        else{
				          return done(null,false);
				        }
				      })
				    })
				);
	        },

	google : function(passport,googlestrategy,user){
				
				  passport.use(new googlestrategy({
				    clientID: '477246379189-0bjf1g4rapvdhndrpiis4tsj082vauhc.apps.googleusercontent.com',
				    clientSecret: 'C66On8qMoTqlyMGEN8QQZEgh',
				    callbackURL: "/auth/google/cb",

				  },
				  function(accessToken, refreshToken, profile, done) {
				    //console.log(profile);
				    var guser = new user({ username:profile.displayName });
				    user.findOne({username:profile.displayName},function(err,data){
				        if(err) throw err;
				        if(data){
				          //res.redirect('/home');
				          return done(null,data);
				        }else{
				          guser.save( function (err, user) {
				            if(err)
				            done(err);
				            console.log("google"+user.username);
				            //basicdp(user.username);
				           return done(null, user);
				         });

				        }
				    });
				  }
				));

	        },

	serial : function(passport){
				passport.serializeUser(function(user, done) {
				  done(null, user);
				});
	         }  ,

	deserial : function(passport){
					passport.deserializeUser(function(user, done) {
					  done(null, user);
					});
	           } ,

	signup : function(user,username,password){
				user.findOne({username:username},function(err,data){
					if(err) throw err;
					if(data)
						res.redirect('/home');
					var pwddata = sha512(password,genrandomstring())
					var newuser = new user({username:username,password:pwddata.pwdhash,salt:pwddata.salt});
					newuser.save(function(err,data){
						if(err) throw err;
						console.log(data);
					})

				})
	         }                         

							
	
}