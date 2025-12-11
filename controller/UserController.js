const User = require('../model/User');


//Register User

exports.registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne ({ email });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login User

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = User.createToken(user);
        res.status(200).json({ 
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get Single User

exports.getUser = async(req,res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update User

exports.updateUser = async (req, res ) => {

    const updates = req.body;

    try {
       const user = await User.findByIdAndUpdate(req.params.id, updates,{ new: true }).select('-password');

         if(!user) return res.status(404).json({message: "User not found"});

         res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Change Role

exports.updateUserRole = async (req, res) => {

    const { role } = req.body;

    try {
       const user = await User.findByIdAndUpdate(req.params.id, { role },{ new: true }).select('-password');

         if(!user) return res.status(404).json({message: "User not found"});

         res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Generate Password Reset Token

exports.generateResetToken = async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});
            if(!user) 
                return res.status(404).json({message: "User not found"});

            const token = crypto.randomBytes(32).toString('hex');

            const resetToken = token;
            const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
            await user.save();

            // send this token via email (not included)
            res.status(200).json({
                message: "Password reset token generated",
                resetToken : token,
            })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }


}

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpiry: { $gt: Date.now() }
        });
        
        if(!user) 
            return res.status(400).json({message: "Invalid or expired token"}); 

        user.password = await bcrypt.hash(req.body.newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({message: "Password reset successful"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


// Delete User

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).select('-password');

        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

}