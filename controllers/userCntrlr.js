const Users = require("../models/userModel")

const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const Payments = require("../models/paymentModel")

const userCntrlr = {
    register: async (req,res) => {
        try{
            const { name, email, password } = req.body; 
            
            const user = await Users.findOne({ email }); 

            if (user)
                return res.status(400).json({ msg: "E-mail en uso." }); 
            
            if (password.length < 6) 
                return res
                .status(400)
                .json({ msg: "La contraseña debe contener al menos 6 caracteres."})
            
            // Password Encryption 
            const passwordHash = await bcrypt.hash(password, 10); 
            const newUser = new Users({
                name,
                email,
                password: passwordHash, 
            }); 

            // Save mongodb 
            await newUser.save() 
            const accessToken = createAccessToken ({ id: newUser._id })
            const refreshToken = createRefreshToken({id: newUser._id}); 

            res.cookie('refreshtoken', 
            refreshToken, {
                httpOnly: true, 
                path: '/users/refresh_token', 
                maxAge: 7*24*60*60*1000 //7d
            })
            
            res.json({accessToken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
     login: async (req,res) =>{
        try{
            const {email, password} = req.body; 
            const user = await Users.findOne({ email }); 

            if(!user)
                return res.status(400); 

            const isMatch = await bcrypt.compare(password, user.password); 
            
                if(!isMatch) 
                    return res.status(400)
                    .json({msg: "Contraseña incorrecta."}); 
            
            // If login success, create acces-token and refresh token
            const accessToken = createAccessToken({ id: user._id }); 

            const refreshToken = createRefreshToken({ id: user._id }); 

            res.cookie("refreshToken", 
            refreshToken, {
                httpOnly: true, 
                path: "/users/refresh_token", 
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({ accessToken })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req,res) =>{
        try{
            res.clearCookie("refreshToken", {
                path: "/users/refresh_token"
            }); 
            return res.json({msg: "Cerraste sesión."})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accessToken = createAccessToken({ id: user.id });

        res.json({ user, accessToken });
      });

      res.json({ rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    getUser: async (req,res) =>{
        try{
            const user = await Users.findById(req.user.id).select("-password"); 
                
                if(!user)
                    return res.status(400)
                    .json({msg: "El usuario no existe" });

            res.json(user); 

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req,res) =>{
        try{
            const user = await Users.findById(req.user.id)

                if(!user)
                    return res.status(400).json({msg: "El usuario no existe"})
            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

                return res.json({msg: "Añadido al carrito!"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    history: async (req,res) => {
        try{
            const history = await Payments.find({user_id: req.user.id})

            res.json(history)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
  };
  const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  };

module.exports = userCntrlr