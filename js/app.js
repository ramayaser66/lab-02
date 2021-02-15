'use strict';
var keywords=[];
var uniqueNames = [];
var arrayObj = [];
function Photo(title,description,keyword,image,horns){
  this.title=title;
  this.description=description;
  this.keyword=keyword;
  this.image=image;
  this.horns=horns;
  arrayObj.push(this);
}
Photo.prototype.renderImages=function(){
  let newPhotoTemplate=$('.photo-template').clone();
  $('main').append(newPhotoTemplate)
  newPhotoTemplate.find('h2').text(this.title);
  newPhotoTemplate.find('img').attr('src',this.image);
  newPhotoTemplate.find('p').text(this.description);
  newPhotoTemplate.removeClass('photo-template');
}


Photo.readJson = () => {
  const ajaxSettings ={
    method: 'get',
    dataType: 'json'
  };
  $.ajax('data/page-1.json',ajaxSettings)
    .then(data =>{
      data.forEach(item => {
        keywords.push(item.keyword);
        let photo= new Photo(item.title,item.description,item.keyword,item.image_url,item.horns);
        photo.renderImages();
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
    var newPhotoTemplate2=$('.photo-template').clone();
    $('main').html("");
    $('main').append(newPhotoTemplate2);  
    arrayObj.forEach(function(value,i){
      if(name===value.keyword){
        value.renderImages();
      }
    });
    

  });
}




// $(() => Photo.readJson());
$( document ).ready(function() {
  Photo.readJson();
  selectPic();

});




