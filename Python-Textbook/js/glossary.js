var glossary =  [

		{
			"word": "block",
			"def": "A group of consecutive statements with the same indentation."
		}, 
        {
			"word": "body",
			"def": "The block of statements in a compound statement that follows the header."
		}, 
        {
			"word": "boolean expression",
			"def": "An expression that is either true or false."
		}, 
        {
			"word": "boolean function",
			"def": "A function that returns a boolean value. The only possible values of the bool type are False and True."
		}, 
        {
			"word": "boolean value",
			"def": "There are exactly two boolean values: True and False. Boolean values result when a boolean expression is evaluated by the Python interepreter. They have type bool."
		}, 
        {
			"word": "branch",
			"def": "One of the possible paths of the flow of execution determined by conditional execution."
		}, 
        {
			"word": "chained conditional",
			"def": "A conditional branch with more than two possible flows of execution. In Python chained conditionals are written with if ... elif ... else statements."
		}, 
        {
			"word": "comparison operator",
			"def": "One of the operators that compares two values: ==, !=, &gt;, &lt;, &gt;=, and &lt;=."
		}, 
        {
			"word": "condition",
			"def": "The boolean expression in a conditional statement that determines which branch is executed."
		}, 
        {
			"word": "conditional statement",
			"def": "A statement that controls the flow of execution depending on some condition. In Python the keywords if, elif, and else are used for conditional statements."
		}, 
        {
			"word": "logical operator",
			"def": "One of the operators that combines boolean expressions: and, or, and not."
		}, 
        {
			"word": "modulus operator",
			"def": "An operator, denoted with a percent sign ( %), that works on integers and yields the remainder when one number is divided by another."
		}, 
        {
			"word": "nesting",
			"def": "One program structure within another, such as a conditional statement inside a branch of another conditional statement."
		}

	];

var out = "<p><ul style='list-style-type:none'>";
for(var i = 0; i<glossary.length; i++) {
        out += '<li><strong>'+ glossary[i].word + ':</strong> ' + glossary[i].def + '</li>';
    }
out += "</ul></p>";
document.getElementById("gloss").innerHTML = out;

