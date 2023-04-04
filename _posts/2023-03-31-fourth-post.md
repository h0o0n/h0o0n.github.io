---
title:  "[JavaScript] 영화관 좌석 예매"
excerpt: ""
categories:
  - JavaScript
tags:
  - [JavaScript, p5.js, Git]

toc: true
toc_sticky: true
 
date: 2023-03-31
last_modified_at: 2023-03-31
---


# 작성중 (HTML/ JavaScript 포함/ CSS 미포함)

![](img/MovieResv2.png)

## Code
```html
<!-- 영화 선택 창 HTML -->
<div class="movieContainer">
  <label for="movie">
  Pick a Movie :
  </label>
  <select name="pickMovie" id="movie">
  <option class="price" value="10">Avengers:Endgame ($10)</option>
  <option class="price" value="12">Joker ($12)</option>
  <option class="price" value="8">Toy Story 4 ($8)</option>
  <option class="price" value="9">The Lion King ($9)</option>
  </select>
</div>
```  
  
Pick Movie  
1.label 옵션을 통해 id가 movie인 select tag에 label 부여  
2.select tag의 value 값을 가격 값으로 이용  

```javascript
//DOMContentLoaded 이벤트를 통해 HTML 문서를 불러온 후 JS 적용
document.addEventListener('DOMContentLoaded', ()=>{
  //클래스 선택자를 이용해 각 클래스 별 변수 지정
  const seatContainer = document.querySelector('.seatContainer');
  const movie = document.getElementById('movie'); // 선택할 영화
  let moviePrice = Number(movie.value); // 영화가격
  let count = document.querySelector('#count'); // 인원수
  let costs = document.querySelector('#costs'); // 총 예매 가격 확인 변수
}

```   
  
```html
<ul class="showcase">
  <li>
  <div class="availableSeat"></div>
  <small class="small">Available Seat</small>
  </li>
  <li>
  <div class="selectedSeatIcon"></div>
  <small class="small">Selected Seat</small>
  </li>
  <li>
  <div class="occupiedSeat"></div>
  <small class="small">Occupied Seat</small>
  </li>
</ul>
```
showcase  
좌석별 확인 용 아이콘 생성  

```html
<div class="seatContainer" style="margin-left:100px;">
  <div class="screen"></div>
  <div class="row">
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
  </div>

  <div class="row">
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="occupiedSeat"></span>
      <span class="occupiedSeat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
  </div>

  <div class="row">
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="occupiedSeat"></span>
      <span class="seat"></span>
  </div>

  <div class="row">
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="occupiedSeat"></span>
      <span class="occupiedSeat"></span>
  </div>

  <div class="row">
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
  </div>

  <div class="row">
      <span class="seat"></span>
      <span class="occupiedSeat"></span>
      <span class="occupiedSeat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="seat"></span>
      <span class="occupiedSeat"></span>
      <span class="seat"></span>
  </div>
</div>
<p style="margin-left:35px; margin-top:-5px;" class="text">
  You have selected<span id="count">0</span> seats for a price of $ <span id="costs">0</span>
</p>
```  
div row 를 이용해 같은 한 줄에 좌석 클래스 배치 
```javascript

//좌석 클릭 이벤트를 통해 클래스 이름 변경 하기

seatContainer.addEventListener('click', (e) => {        //seatContainer 클릭시 이벤트 발생

    if(e.target.className === 'seat'){                  //seat --> selectedSeat 클래스로 변경         
        e.target.className = 'selectedSeat';           
    } else if(e.target.className === 'selectedSeat'){   //selectedSeat --> seat 클래스로 변경
        e.target.className = 'seat';
    }

    countSeatPrice();                                   //총 가격 계산 기능 실행;
})

//가격 계산 기능 추가
function countSeatPrice(){
  const selectedSeatCount = document.querySelectorAll('.selctedSeat').length; //선택된 좌석들에 대한 변수 
  count.textContent = selectedSeatCount;                                      // span id ="count" 에 selected countSeatPrice 값 추가
  costs.textContent = selectedSeatCount * moviePrice;                         // span id ="costs" 에 총 가격 값 추가
}
```  

```html
<div class="moviePic" style="width: 111px; height:200px; display:inline-block; margin-left:30px; margin-right: 100px; margin-top:105px;">
  <img id="myImg" src="img/ban_1.jpg" style="width:300px; border-radius: 7px; height:400px; float:left;">
</div>
```
선택 변경시 이미지 변경을 위한 div 태그 생성  
  
```javascript 
//선택한 영화 이미지 변경 function
function changMoviePicture(){
    let index = movie.selectedIndex;  //select한 index값 변수 지정
    var myImg = document.getElementById("myImg"); 
    myImg.setAttribute("src","img/ban_" + index + ".jpg"); //그림 이름_ + index값 으로 그림 불러오기
}

//영화 변경시 이벤트 발생 
movie.addEventListener('change', (e) => {

    changMoviePicture() // 이미지 변경 function 실행
    moviePrice = Number(e.target.value); // option 값의 value를 이용하여 가격 변수 설정
    countSeatPrice()   // 가격 계산 function 실행
})
``` 
