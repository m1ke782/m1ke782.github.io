const COLOURS = {
	primary : "#44BBA4",
	secondary : "#FFF8F0",
	tertiary : "#1E1E24",
	accent : "#16161A",
	correct : "#A41623",
};

const LINKS = {
	170 : "https://openprocessing.org/user/278791",
	14 : "https://github.com/m1ke782"
};


class Box
{
	constructor()
	{
		this.value = 0;
		this.target = false;
	}
	Flip()
	{
		this.target = !this.target;
	}
	Update()
	{
		if (this.target) this.value = lerp(this.value, 1, deltaTime/100);
		else this.value = lerp(this.value, 0, deltaTime/100);
	}
}

class Nav
{
	constructor()
	{
		//drawing information
		this.bx = (min(width, height)/3)*0.98;
		this.size = this.bx*3;
		this.offset = [(width-this.size)/2, (height-this.size)/2];

		//puzzle
		this.puzzle = [];
		for (let i = 0; i < 9; i++)
			this.puzzle.push(new Box());

		//number
		this.set = -1;
		this.setTime = 0;
		this.locked = false;
	}
	Resize()
	{
		this.bx = (min(width, height)/3)*0.98;
		this.size = this.bx*3;
		this.offset = [(width-this.size)/2, (height-this.size)/2];
	}
	Over(x,y)
	{
		//get box coordinates
		let bx = (x-this.offset[0])/this.bx;
		let by = (y-this.offset[1])/this.bx;
		
		//return if out of bounds
		if (bx < 0 || bx > 3 || by < 0 || by > 3)
			return -1;
		
		//return bounds (adjusted to fit box)
		return int(bx) + int(by)*3;
	}
	Click()
	{
		//get over
		let over = this.Over(mouseX, mouseY);
		if (over == -1)
			return;

		//apply change
		this.Change(over);
	}
	Change(i)
	{
		if (this.locked)
			return;

		//flip
		this.puzzle[i].Flip();

		//get number
		let num = 0;
		let s = ""
		for (let i = 0; i < 9; i++)
		{
			if (this.puzzle[i].target)
				num += 2**i;
		}

		console.log(num);

		//set
		if (num in LINKS) 
			this.set = num;	
		else this.set = -1;
	}

	Draw()
	{
		//transforms
		push();
		translate(this.offset[0], this.offset[1]);

		//draw grid
		stroke(COLOURS.secondary);
		for (let i = 0; i <= 3; i++)
		{
			line(i*this.bx, 0, i*this.bx, this.size);
			line(0, i*this.bx, this.size, i*this.bx);
		}

		//set
		if (!this.locked)
		{
			//lerp to zero if not set
			if (this.set == -1) 
				this.setTime = lerp(this.setTime, 0, deltaTime/100);
			//lerp to one
			else 
			{
				this.setTime = lerp(this.setTime, 1, deltaTime/100);
				//if exceeds value, then redirect to correct link
				if (this.setTime > 0.9)
				{
					this.locked = true;
					window.location.href = LINKS[this.set];
				}
			}
		}
		
		//draw blocks
		fill(lerpColor(color(COLOURS.primary), color(COLOURS.correct), this.setTime));
		for (let x = 0; x < 3; x++)
		{
			for (let y = 0; y < 3; y++)
			{
				//lerp size
				let i = x+y*3;
				this.puzzle[i].Update();
				let thisSize = lerp(0, this.bx*0.9, this.puzzle[i].value);
				let offset = (this.bx-thisSize)/2

				//ignore if too small
				if (thisSize < 1)
					continue;
				
				//draw
				rect(x*this.bx + offset, y*this.bx + offset, thisSize, thisSize);
			}
		}
	

		pop();
	}
	
}

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	background(COLOURS.tertiary);
	
	NAV = new Nav();
}
function mouseClicked() {NAV.Click();}
function keyPressed()
{
	if (!isNaN(key))
	{
		if (key != "0") 
			NAV.Change(int(key)-1);
	}
}
function windowResized()
{
	resizeCanvas(windowWidth, windowHeight);
	NAV.Resize();
}
function draw() 
{
	clear();
	background(COLOURS.tertiary);
	NAV.Draw();
}
