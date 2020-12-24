// [color, top (default: 120vh), left(25-75 vw), hitpoint, size]
let balloon_info = [];
const balloon_color = [['red', 5], ['purple', 10], ['green', 15], ['white', 20]];
let full_click = 0;
let click = 0;
let score_percentage = 0;

setBalloon();

function setBalloon() {
    const div = document.getElementById('balloon_div');
    for (let i = 0; i < 30; i++) {
        const rand = Math.floor(Math.random() * 4);
        const left = Math.floor(Math.random() * 50) + 25;
        let top;
        if(i === 0){
            top = 110;
        }else{
           const plus_top = Math.floor(Math.random() * 40) + 15;
           console.log('balloon' + i + ':' + balloon_info[i-1][1]);
           top = balloon_info[i-1][1] + plus_top;
        }
        const widthSize = Math.floor(Math.random() * 50) + 60;
        balloon_info.push([
            'img/' + balloon_color[rand][0] + '_balloon.png',
            top,
            left,
            balloon_color[rand][1],
            widthSize
        ]);
        const image = document.createElement('img');
        image.src = 'img/' + balloon_color[rand][0] + '_balloon.png';
        image.style.width = widthSize + 'px';
        image.style.left = left + 'vw';
        image.style.top = top + 'vh';
        image.className = 'balloons';
        image.onclick = function() {
            balloon_info[i][3]--;
            if(balloon_info[i][3] <= 0){
                image.style.display = 'none';
            }
            changeProgress();
        };
        image.setAttribute('id', 'balloon_' + i); 
        div.appendChild(image); 
        full_click += balloon_color[rand][1];
    }
}
setInterval(move, 10);
function move() {
    for (let i = 0; i < 30; i++) {
        balloon_info[i][1] -= .06;
        document.getElementById('balloon_' + i).style.top = balloon_info[i][1] + 'vh';
    }
}


function changeProgress() {
    click++;
    score_percentage = Math.floor(click / full_click * 100);
    document.getElementById('progress_text').innerHTML = score_percentage + '%';
    document.getElementById('progress').style.width = score_percentage + '%';
    if(click >= full_click){
        alert('stage clear!');
        location.reload();
    }
}