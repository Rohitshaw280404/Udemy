const register = async (req, res) => {
    

    const { userName, email, password } = req.body;
    if(userName == userNameindb){
        res
        .status(401)
        .json("User already Exists");
    }
   
}

const login = async (req, res) => {
    const userName = req.body;
    const password = req.body;
    if(userName != userNameindb){
        res
        .status(400)
        .json("Invalid Credentials");
    }
    if(password != passwordindb){
        res
        .status(400)
        .json("Invalid Password");
    }
}