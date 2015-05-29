/**
 * Created by Moritz on 11.11.2014.
 */

document.onkeydown = KeyDown;
document.onkeyup = KeyUp;

Up = false;
Down = false;
Left = false;
Right = false;

function KeyDown(event)
{
    if(event.keyCode==38)
    {
        Up = true;
    }
    if(event.keyCode==40)
    {
        Down = true;
    }
    if(event.keyCode==37)
    {
        Left = true;
    }
    if(event.keyCode==39)
    {
        Right = true;
    }

    if(Right || Left)
        document.getElementById("info").remove();
}

function KeyUp(event)
{
    if(event.keyCode==38)
    {
        Up = false;
    }
    if(event.keyCode==40)
    {
        Down = false;
    }
    if(event.keyCode==37)
    {
        Left = false;
    }
    if(event.keyCode==39)
    {
        Right = false;
    }
}

player = document.getElementById("player");

function rotate(element, deg)
{
    element.style.webkitTransform = 'rotate('+deg+'deg)';
    element.style.mozTransform    = 'rotate('+deg+'deg)';
    element.style.msTransform     = 'rotate('+deg+'deg)';
    element.style.oTransform      = 'rotate('+deg+'deg)';
    element.style.transform       = 'rotate('+deg+'deg)';
}

function setMargin(element, margin)
{
    element.style.marginLeft = margin + "px";
}


function update()
{
    var margin = player.style.marginLeft;
    margin = margin.substr(0, margin.length - 2);

    margin = parseInt(margin);

    if(Right)
    {
        margin = margin + 15;
        setMargin(player, margin);
        rotate(player, 15);
    }

    if(Left)
    {
        margin = margin - 15;
        setMargin(player, margin);
        rotate(player, -15);
    }

    if(Left == false && Right == false)
        rotate(player, 0);

    //Kollision
    if(margin > 1200 - 50 && currentSite != "kontakt")
    {
        doNextSite();
        margin = 0;
        setMargin(player, margin);
    }

    if(margin > 1200 - 50 && currentSite == "kontakt")
    {
        margin = 1200 - 50;
        setMargin(player, margin);
    }

    if(margin < 0 && currentSite == "ich")
    {
        margin = 0;
        setMargin(player, margin);
    }

    if(margin < 0 && currentSite != "ich")
    {
        margin = 1200 - 50;
        setMargin(player, margin);
        doPrevSite();
    }
    //Ende Kollision

}

setInterval(update, 30);