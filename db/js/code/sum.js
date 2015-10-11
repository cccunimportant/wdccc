sum=0;
for (i=1; i<=10; i++) {
	sum = sum+i;
}
console.log("1+...+10="+sum);

sum=0;
i=1;
while (i<=10) {
	sum = sum + i;
	i++; // i++ 是 i=i+1 的簡寫
}
console.log("1+...+10="+sum);
