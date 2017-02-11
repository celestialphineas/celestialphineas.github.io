var typewriter =
{
    DOMElement: document.getElementById('uc'),
    baseString: 'Under construction...',
    typing: true,
    cursor: 0,
    frameWidth: 10,
    currentFrame: 0,
    forwardShifting: [],
    backwardShifting: 100,
    init: function(
        _DOMElement,
        _baseString,
        _frameWidth,
        forwardShiftingLowerBound,
        forwardShiftingUpperBound,
        backwardShiftingValue
    )
    {
        var i;
        this.typing = true;
        this.cursor = 0;
        this.frameWidth = _frameWidth;
        this.currentFrame = 0;
        this.DOMElement = _DOMElement;
        this.baseString = _baseString;
        this.forwardShifting[0] = Math.random() *
            (forwardShiftingUpperBound - forwardShiftingLowerBound)
            + forwardShiftingLowerBound;
        this.backwardShifting = backwardShiftingValue;
        for(i = 1; i < this.baseString.length; i++)
        {
            this.forwardShifting[i] = this.forwardShifting[i - 1]
                + Math.random() * (forwardShiftingUpperBound -100) + 100;
        }
    },
    shift: function()
    {
        var i;
        if(this.typing)
        {
            for(i = 0; i < this.baseString.length; i++)
                if(this.currentFrame < this.forwardShifting[i]) break;
            this.cursor = i;
            if(this.cursor === this.baseString.length)
            {
                this.typing = false;
                this.currentFrame = this.backwardShifting * this.baseString.length;
            }
            else this.currentFrame += this.frameWidth;
        }
        else
        {
            for(i = this.baseString.length; i >= 0; i--)
                if(this.currentFrame > this.backwardShifting * (i + 1)) break;
            this.cursor = i;
            if(i === -1)
            {
                this.typing = true;
                this.currentFrame = 0;
            }
            else this.currentFrame -= this.frameWidth;
        }
        this.DOMElement.innerText = this.baseString.substr(0, this.cursor);
    }
}

typewriter.init(document.getElementById('uc'), 'Under construction...', 10, 100, 200, 50);
setInterval('typewriter.shift()', 10);