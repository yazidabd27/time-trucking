let titles=document.querySelectorAll('.title span');
let currentHours=document.querySelectorAll('.current span');
let previousHours=document.querySelectorAll('.previous');
let daily=document.querySelector('.daily');
let weekly=document.querySelector('.weekly');
let monthly=document.querySelector('.monthly');
let frames=Array.from(document.querySelectorAll('.frames div'));

let time='weekly'

function getData(time){

    let XHR=new XMLHttpRequest();
    XHR.open('GET','data.json',true);
    XHR.send();

    XHR.onreadystatechange=function(){
        if(this.readyState===4 && this.status===200){
            let data=JSON.parse(this.response);
            data.forEach((frame,index)=>{
                titles[index].innerHTML=frame.title;
                currentHours[index].innerHTML=frame.timeframes[time].current;

                switch(time){
                    case 'daily':
                        previousHours[index].innerHTML=`Yesterady - ${frame.timeframes[time].previous}`;
                        break;

                    case 'weekly':
                        previousHours[index].innerHTML=`Last Week - ${frame.timeframes[time].previous}`;
                        break;
                        

                    case 'monthly':
                        previousHours[index].innerHTML=`Last Month - ${frame.timeframes[time].previous}`;
                        break;

                }
            });
        }
    };
    
};

getData(time);

frames.forEach(fr=>{
    fr.onclick=function(){
        frames.forEach(fr=>{
            fr.classList.remove('active')
        });
        getData(this.className);
        this.classList.add('active');
    };
});



