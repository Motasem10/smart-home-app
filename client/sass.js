const sass=require('node-sass');
const fs=require('fs');

sass.render({
    file:'./public/new/style.scss'
},(err,result)=>{
    if(err) return console.log(err);


    console.log(result)
    fs.writeFile('./public/new/result.css',result,(err)=>{
        if(err) return  console.log(err);
        ;
    })

})