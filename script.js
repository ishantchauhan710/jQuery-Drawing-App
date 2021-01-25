$(function() {
    
    //Painting or not?
    var paint = false;
    
    //Painting or erasing
    var paint_erase = "paint";
    
    //Get canvas 
    var canvas = document.getElementById("paint");
    
    //Context
    var ctx = canvas.getContext("2d");
    
    //Get canvas container
    var container = $("#container");
    
    //Mouse position
    var mouse = {x:0,y:0};
    
    
    //Get saved work
        if(localStorage.getItem("imgCanvas")!=null) {
            var img = new Image();
            img.onload = function() {
                ctx.drawImage(img,0,0);
            }
            img.src = localStorage.getItem("imgCanvas");
        }
    
    //Setting up drawing properties like width, join and cap of the line
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    //Clicking inside the container
    container.mousedown(function(e) {
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    })
    
    
    
    //Move the mouse while holding the mouse key
    container.mousemove(function(e) {
    
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint==true) {
            if(paint_erase=="paint") {
                //Get color input
                ctx.strokeStyle = $("#paintColor").val();
            } else {
                //White color for erasing
                ctx.strokeStyle = "white";
            }
            
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
            
        }
    });
    
    
    container.mouseup(function() {
       paint = false; 
    });
    
    container.mouseleave(function() {
       paint = false; 
    });
    
    //Click on erase button
    $("#erase").click(function() {
      if(paint_erase=="paint") {
           paint_erase = "erase";
       } else {
           paint_erase = "paint";
       }
        $(this).toggleClass("eraseMode");
    });
    
    
    //Click on reset button
    $("#reset").click(function() {
       ctx.clearRect(0,0,canvas.width,canvas.height);
        
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
        
    });
    
    $("#save").click(function(){
        //Click on save button
        if(typeof(localStorage)!=null) {
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            window.alert("Drawing saved successfully!");
        } else {
            window.alert("Your browser does not support local storage!");
        }

    });
    
    //Color width
       $("#slider").slider({
       min: 3,
       max: 30,
       slide: function(event,ui) {
           $("#circle").height(ui.value);
           $("#circle").width(ui.value);
           ctx.lineWidth = ui.value;
       }
   });
    
    //Change color input
    $("#paintColor").change(function() {
        $("#circle").css("background-color",$(this).val())
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});