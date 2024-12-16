import { body , validationResult} from "express-validator";

// Hoisted Declatation => a function 
// class
// assignment expression

const validateRequest =async (req,res,next) => {
// Validate Data
    // 1. SetUp Rules for validation
const rules = [
    body('_projectname').notEmpty().withMessage('Project Name is Required !!'),
    body('_desc').notEmpty().withMessage('Description is Required !!'),
    body('_author').notEmpty().withMessage('Author name is Required !!'),
    body('_progress').notEmpty().withMessage('Progress value is Required. !!'),
]

    // 2. Run Those Rules ...
    await Promise.all(rules.map(rule=>rule.run(req)));

    // 3. Check if there are any errors after running the rules
    var validationErrors = validationResult(req);
    // 4. if errors,return the error message
    if(!validationErrors.isEmpty()){
        return res.render('createnewProject',{
            errorMessage:validationErrors.array()[0].msg,
        })
    }


next();
};
export default validateRequest;