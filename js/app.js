'use strict';
var keywords=[];
var uniqueNames = [];
var arrayObj = [];
var arrayObj3 = [];
var temtex="<template id='temp' type='text/x-tmpl-mustache'><div class='divPage2'><h2>{{title}}</h2><hr> <img src={{image}} alt=''><p>{{description}}</p></div></template>";
function Photo(title,description,keyword,image,horns){
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.image=image;
  this.horns=horns;
  arrayObj.push(this);
}
// Photo.prototype.renderImages=function(){
//   let newPhotoTemplate=$('.photo-template').clone();
//   $('main').append(newPhotoTemplate)
//   newPhotoTemplate.find('h2').text(this.title);
//   newPhotoTemplate.find('img').attr('src',this.image);
//   newPhotoTemplate.find('p').text(this.description);
//   newPhotoTemplate.removeClass('photo-template');
// }
Photo.prototype.renderImagesPageTwo=function(){
  let newPhotoTempe=$('#temp').html();
  $('main').append(Mustache.render(newPhotoTempe, this));

}


Photo.readJson = () => {
  const ajaxSettings ={
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json',ajaxSettings)
    .then(data =>{
      arrayObj=[];
      data.forEach(item => {
        keywords.push(item.keyword);
        let photo= new Photo(item.title,item.description,item.keyword,item.image_url,item.horns);
        photo.renderImagesPageTwo();
      });

      $.each(keywords, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
      });

      uniqueNames.forEach(function(value,i){
        $("#select").append("<option value="+value+">"+value+"</option>");
      });

      


    });
};

Photo.readJson2 = () => {
  const ajaxSettings ={
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-2.json',ajaxSettings)
    .then(data =>{
      arrayObj=[];

      data.forEach(item => {
        keywords.push(item.keyword);
        let photo= new Photo(item.title,item.description,item.keyword,item.image_url,item.horns);
        photo.renderImagesPageTwo();
      });

      $.each(keywords, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
      });

      uniqueNames.forEach(function(value,i){
        $("#select").append("<option value="+value+">"+value+"</option>");
      });

    });
};
function selectPic(){
  $("#select").on('change',function(){
    var name=this.options[this.selectedIndex].text;
    $(".divPage2").remove();
    arrayObj3=arrayObj;
    let arrayObj2=arrayObj3;
    arrayObj3=[];
    arrayObj2.forEach(function(value,i){
      if(name===value.keyword){
        value.renderImagesPageTwo();
        arrayObj3.push(value);
      }
    });
  });
}

function page1(){
  $(".divPage2").remove();
  keywords=[];
  uniqueNames=[];
  $(".divPage2").html("");
  $("#select").html("");
  $("#select").append("<option value='default'>Filter by Keyword</option>");
  $("section").addClass("photo-template");
  Photo.readJson();
}

function page2(){
  $(".divPage2").remove();
  keywords=[];
  uniqueNames=[];
  $(".divPage2").html("");
  $("#select").html("");
  $("#select").append("<option value='default'>Filter by Keyword</option>");
  $("section").addClass("photo-template");
  Photo.readJson2();
}



function sortTitle(){
  $(".divPage2").remove();
  arrayObj.sort(function(a, b){
    if(a.title < b.title) { return -1; }
    if(a.title > b.title) { return 1; }
    return 0;
  });
  // $(".divPage2").html("");
  arrayObj.forEach(function(value,i){
    value.renderImagesPageTwo();

  });
}

function sortHorn(){
  $(".divPage2").remove();
  arrayObj.sort(function(a, b){
    if(a.horns < b.horns) { return 1; }
    if(a.horns > b.horns) { return -1; }
    return 0;
  });
  arrayObj.forEach(function(value,i){
    value.renderImagesPageTwo();

  });
}



// $(() => Photo.readJson());
$( document ).ready(function() {
  $("#page1").on("click",page1);
  $("#page2").on("click",page2);
  $("#title").on("click",sortTitle);
  $("#horns ").on("click",sortHorn);
  Photo.readJson();
  // Photo.readJson2();
  selectPic();

});




