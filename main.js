status="";
sound="";
object= [];

function preload() {
    sound = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetection = ml5.objectDetector('cocossd' , modelLoded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoded() {
    console.log('Model Loded');
    status = true;
}

function gotResult(error,results) { 
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results ;
    }
}

function draw() {
    image(video,0,0,380,380);
    if(status != "") {
        objectDetection.detect(video,gotResult);
        r = random(255);
        g = random(255);
        b = random(225);
        for(i = 0; i < object.length; i++){
            fill(r,g,b);
            accuracy = floor(object[i].confidence * 100)
            text(object[i].label + " " + accuracy +"%", object[i].x+10, object[i].y+20);
            stroke(r,g,b);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById("status").innerHTML = "Status : Objects Detected" ;
            if(object[i].label == "Person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                sound.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                sound.play();
            }
        }
        if(object.length == 0){
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            sound.play();
        }
    }
}