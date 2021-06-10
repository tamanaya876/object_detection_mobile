img = "";
status = "";
object = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detection";
}

function modelLoaded()
{
    console.log('Model Loaded!');
    status = true;
}

function gotResults(error,results)
{    
    if(error)
    {
        console.error(error);
    }

    else
    {
        console.log(results);
        object = results;
    }
}

function draw()
{
    image(video,0,0,380,380);
    
    if(status != "")
    {    
            objectDetection.detect(video,gotResults);
            r = random(255);
            g = random(255);
            b = random(255);

        for(i = 0;i < object.length;i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detection";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects : " + object.length;

            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " "+ percent + "%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}