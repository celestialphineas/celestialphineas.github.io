var typewriter = 
{
    baseString: 'Under Construction...',
    cursor: 0,
    typing: true,
    currentString: '',
    DOMElement: null,
    forwardShifting: [],
    backwardShifting: [],
    forwardTimeIntervalRandomize: true,
    backwardTimeIntervalRandomzie: false,
    forwardTimeIntervalBounds: [1000, 1800],
    backwardTimeIntervalBounds: [1000, 1800],
    init: function(elementID)
    {
        var i;
        this.cursor = 0;
        this.typing = true;
        this.currentString = '';
        this.DOMElement = document.getElementById(elementID).innerText;
        if(this.forwardTimeIntervalRandomize)
        {
            for(i = 0; i < this.baseString.length; i++)
            {
                this.forwardShifting[i] =
                    Math.random() * (this.forwardTimeIntervalBounds[1] - 
                    this.forwardTimeIntervalBounds[0]) + this.forwardTimeIntervalBounds[0];
            }
        }
        else
        {
            for(i = 0; i < this.baseString.length; i++)
            {
                this.forwardShifting[i] = (this.forwardTimeIntervalBounds[0]
                    + this.forwardTimeIntervalBounds[1])/2;
            }
        }
        if(this.backwardTimeIntervalRandomzie)
        {
            for(i = 0; i < this.baseString.length; i++)
            {
                this.backwardShifting[i] =
                    Math.random() * (this.backwardTimeIntervalBounds[1] -
                    this.backwardTimeIntervalBounds[0]) + backwardTimeIntervalBounds[0];
            }
        }
        else
        {
            for(i = 0; i < this.baseString.length; i++)
            {
                this.backwardShifting[i] = (this.backwardTimeIntervalBounds[0]
                    + this.backwardTimeIntervalBounds[1])/2;
            }
        }
    },
    shift: function()
    {
        if(this.typing)
        {
            setTimeout('this.DOMElement = this.currentString',
                this.forwardShifting[this.cursor]);
            this.cursor++;
            this.currentString = this.baseString.substr(0, this.cursor);
            if(this.cursor >= this.baseString.length) this.typing = false;
        }
        else
        {
            setTimeout('this.DOMElement = this.currentString',
                this.backwardShifting[this.cursor]);
            this.cursor--;
            this.currentString = this.baseString.substr(0, this.cursor);
            if(this.cursor <= 0) this.typing = true;
        }
    }
};

typewriter.init('uc');
typewriter.shift();
typewriter.shift();
