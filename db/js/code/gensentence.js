function rand(a,b) { 
	return a+Math.random()*(b-a); 
}

function randInt(a,b) { 
	return Math.floor(a+Math.random()*(b-a)); 
}

function randSelect(a) { 
	return a[randInt(0,a.length)]; 
}
/*
for (var i=0; i<10; i++) {
	var animal = randSelect(['dog', 'cat']);
	console.log("%s", animal);
}
*/
/*
S = NP VP
NP = DET N
VP = V NP
N = dog | cat
V = chase | eat
DET = a | the
*/

function S() {
	return NP()+" "+VP();
}

function NP() {
	return DET()+" "+N();
}

function VP() {
	return V()+" "+NP();
}

function N() {
	return randSelect(["dog", "cat"]);
}

function V() {
	return randSelect(["chase", "eat"]);
}

function DET() {
	return randSelect(["a", "the"]);
}

console.log(S());
