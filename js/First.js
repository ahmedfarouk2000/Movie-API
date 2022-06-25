

//now_playing
//popular
// top_rated

//trending
//https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR18lfp5WsJfmVx41FnX39WHEnK2YxdiH4fLgEs26f0CpUuAHc1-L_Gs2SE

//upcoming



// search api 
//https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR18lfp5WsJfmVx41FnX39WHEnK2YxdiH4fLgEs26f0CpUuAHc1-L_Gs2SE&language=en-US&page=1&include_adult=false



// img path just change the last part 
//https://image.tmdb.org/t/p/w500/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg

const map = new Map();
map.set("Now Playing", "now_playing");
map.set("Popular", "popular");
map.set("Top Rated", "top_rated");
map.set("Upcoming", "upcoming");

var CurrentMovies=[]

getAllMovies('Now Playing');




async function getAllMovies(movie){
    document.querySelector('.CurrentTitle').innerText='Movie Type:'+movie ;
    currentSelected = map.get(movie)
    if (currentSelected==undefined) // means the trending movies only 
        var allData = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR18lfp5WsJfmVx41FnX39WHEnK2YxdiH4fLgEs26f0CpUuAHc1-L_Gs2SE`);
    else 
        var allData = await fetch(`https://api.themoviedb.org/3/movie/${currentSelected}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR18lfp5WsJfmVx41FnX39WHEnK2YxdiH4fLgEs26f0CpUuAHc1-L_Gs2SE&language=en-US&page=1`);

    var resp= await allData.json() ;
    var results= await resp.results ; 
    console.log(results);
    CurrentMovies=[]
    CurrentMovies.push(...results)
    DisplayMovies(results)  
}



var selectedType =document.querySelectorAll('.MovieType') ;
for (const selceted of selectedType) {
    selceted.addEventListener("click",function(e){
        console.log(this.innerText)
        getAllMovies(this.innerText)
    })
}


function DisplayMovies(results){
    if (results.length==0){
    var AllMovies=` <div class="col-12 text-center" id="NoResults"> 
    <img src="images/No results.png" alt="" class="w-25">
    <p class='noresults title2'> No Movies Were Found!</p>
    </div>`;
    }
    else 
        var AllMovies='' ;
    for (const result of results) {

        var title= result.title
        if (title==undefined)
            title=  result.name
        
        var Date =result.release_date
        if (Date == undefined)
            Date=  result.first_air_date

        var CurrentMovie = `
                <div class="col-xl-4 col-md-6 col-sm-12 Movie position-relative overflow-hidden">
                    <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" alt="" class="w-100 Movie">
                    <div class="layer">
                        <h1 class="text-center w-100 px-3 title1">${title}</h1>   
                        <p class="text-center w-100 px-3 title2">${result.overview}</p>   
                        <p class="text-center w-100 px-3 title2">Rate: ${result.vote_average}</p>   
                        <p class="text-center w-100 px-3 title2" >Release Date: ${Date}</p>   
                    </div>
                </div>
          `
          AllMovies+=CurrentMovie ;
    }
    document.querySelector('.AllMovies').innerHTML =AllMovies ;
}




document.querySelector('.NormalSearch').addEventListener('input',function(e){
    document.querySelector('.APISearch').value=''
    console.log('workingggggg');
    console.log(CurrentMovies);
    console.log(this.value)
    var CurrentInput =this.value.toLowerCase()
    const FindMovies = CurrentMovies.filter(element => {
        if (element.title.toLowerCase().indexOf(CurrentInput) !== -1) {
          return true;
        }
      });
    console.log(FindMovies);
    console.log('ggggg');
    DisplayMovies(FindMovies);
})




document.querySelector('.APISearch').addEventListener('input',async function(e){
    document.querySelector('.NormalSearch').value=''
   var SearchResults = await SearchAPI(this.value)
    DisplayMovies(SearchResults);
})




async function SearchAPI(input){
var allData = await fetch(`
https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR13JcSXpFkqTDVetmFRh6Y7YEx_B5n3CHAkcfRmN8eHvIsqnCbrOzLqNIs&query=${input}
`);
var resp= await allData.json() ;
var results= await resp.results ; 
return results
}


var Toggle =document.querySelector('.SideBar')
// $('.OpenBar').click(function(){
//     console.log(Toggle.style.left);
//     if (Toggle.style.left=='0px'){ // means its opened
//         console.log('its 0 man');
//         $('.SideBar').animate({left:'calc(-300px * calc(70 / 100))'},500)
//     }

   
      
//     else { // means its closed right now its first time click on to open
//         console.log('its not 0 man');
//         $('.SideBar').animate({left:'0'},500)
//     }
       
  
// })


document.querySelector('.OpenBar').addEventListener('click',function(){
    if (Toggle.style.left=='0px'){ // close
        console.log('its 0 man');
        Toggle.style.left='calc(-300px * calc(70 / 100))'
        $('.OpenBar').toggle(0)
        $('.CloseBar').toggle(0)

        $('.MovieType').slideToggle(1000)

        // $('.OpenBar').css('display','block')
        // $('.CloseBar').css('display','none')
    }

      
    else { //  open
        console.log('its not 0 man 222222');
        // $('.SideBar').animate({left:'0'},500)
        // $('.OpenBar').css('display','none')
        // $('.CloseBar').css('display','block')
        $('.OpenBar').toggle(0)
        $('.CloseBar').toggle(0)
        $('.MovieType').slideToggle(1000)
        Toggle.style.left='0'
    }
})



document.querySelector('.CloseBar').addEventListener('click',function(){
        // $('.SideBar').animate({left:'0'},500)
        console.log('heeere dadyd');
        // $('.OpenBar').css('display','block')
        // $('.CloseBar').css('display','none')
        $('.OpenBar').toggle(0)
        $('.CloseBar').toggle(0)
        $('.MovieType').slideToggle(1000)
        Toggle.style.left='calc(-300px * calc(70 / 100))'
})



// ^01(0|1|2|5)[0-9]{8}$ telephoneeeee

// ^[a-z0-9]{1,200}@(gmail.com|hotmail.com|yahoo.com)$  mail

//  [a-z0-9] name

// ^[0-9]{2}$ age 


// (?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9]{8,}) passssssss



var Name =document.querySelector('.Name');
var Email =document.querySelector('.Email');
var Phone =document.querySelector('.Phone');
var Age =document.querySelector('.Age');
var Pass =document.querySelector('.Pass');
var Repass =document.querySelector('.Repass');

Name.addEventListener('input',function(e){
    var Erorr=  document.querySelector('.ErrorMsgName')
    var Regex =/^\S+$/
    if(Regex.test(this.value)){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{
        console.log('failed');
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})


Email.addEventListener('input',function(e){
    var Erorr=  document.querySelector('.ErrorMsgEmail')
    var Regex =/^[a-z0-9]{1,200}@(gmail.com|hotmail.com|yahoo.com)$/
    if(Regex.test(this.value)){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{
        console.log('failed');
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})



Phone.addEventListener('input',function(e){
    var Erorr=  document.querySelector('.ErrorMsgPhone')
    var Regex =/^01(0|1|2|5)[0-9]{8}$/
    if(Regex.test(this.value)){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{
        console.log('failed');
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})

Age.addEventListener('input',function(e){
    var Regex =/^[1-9][0-9]$/
    var Erorr=  document.querySelector('.ErrorMsgAge')
    if(Regex.test(this.value)){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{
        console.log('failed');
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})


Pass.addEventListener('input',function(e){
    var Erorr=  document.querySelector('.ErrorMsgPass')
    var Regex =/(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9]{8,})/
    if(Regex.test(this.value)){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{  
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})




Repass.addEventListener('input',function(e){
    var Regex =/(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9]{8,})/
    var Erorr=  document.querySelector('.ErrorMsgRepass')
    if(Regex.test(this.value) && this.value==Pass.value){
        console.log('nice work');
        this.classList.remove('red')
        this.classList.add('green')
        Erorr.style.top='50%'
        Erorr.style.opacity='0'
    }
    else{
        console.log('failed');
        this.classList.remove('green')
        this.classList.add('red')
        Erorr.style.top='100%'
        Erorr.style.opacity='1'
    }
})