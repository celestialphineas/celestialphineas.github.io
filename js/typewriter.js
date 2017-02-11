var typewriter =
{
    baseString: 'Under construction...',
    DOMElement: document.getElementById('uc'),
    typing: true,
    cursor: 0,
    frameWidth: 10,
    currentFrame: 0,
    forwardShifting: [],
    backwardShifting: 1000,
    init: function()
    {
        var i;
        this.typing = true;
        this.cursor = 0;
        this.frameWidth = 10;
        this.currentFrame = 0;
        this.forwardShifting[0] = Math.random() * (500 - 100) + 100;
        for(i = 1; i < this.baseString.length; i++)
        {
            this.forwardShifting[i] = this.forwardShifting[i - 1]
                + Math.random() * (500 -100) + 100;
        }
    },
    shift: function()
    {
        var i;
        if(this.typing)
        {
            for(i = 0; i < this.baseString.length; i++)
            {
                if(this.forwardShifting[i] > this.currentFrame) break;
            }
            if(this.cursor === this.baseString.length)
            {
                this.cursor = this.baseString.length - 1;
                this.typing = false;
                this.currentFrame = this.baseString.length * this.frameWidth;
            }
            else
            {
                this.cursor = i;
                this.currentFrame += this.frameWidth;
            }
        }
        else
        {
            for(i = this.baseString.length - 1; i >= 0; i--)
            {
                if(i * this.backwardShifting < this.currentFrame) break;
            }
            if(this.cursor === -1)
            {
                this.cursor = 0;
                this.typing = true;
                this.currentFrame = 0;
            }
            else
            {
                this.cursor = i;
                this.currentFrame -= this.frameWidth;
            }
        }
        this.DOMElement.innerText = this.cursor;
    }
}

typewriter.init();
setInterval('typewriter.shift()', 10);